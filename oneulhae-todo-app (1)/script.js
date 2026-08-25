/* =========================================================
   오늘해 - 호환성 개선 JavaScript
   등록 / 수정 / 삭제 / 완료 / 검색 / 필터 / 정렬 / 저장
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var STORAGE_KEY = "oneulhae.tasks.v1";
    var tasks = [];
    var currentView = "all";
    var toastTimer = null;

    /* HTML 요소 가져오기 */
    var taskForm = document.getElementById("taskForm");
    var taskIdInput = document.getElementById("taskId");
    var titleInput = document.getElementById("title");
    var memoInput = document.getElementById("memo");
    var dueDateInput = document.getElementById("dueDate");
    var dueTimeInput = document.getElementById("dueTime");
    var categoryInput = document.getElementById("category");
    var priorityInput = document.getElementById("priority");
    var titleError = document.getElementById("titleError");
    var formTitle = document.getElementById("formTitle");
    var saveButton = document.getElementById("saveBtn");
    var cancelEditButton = document.getElementById("cancelEdit");
    var focusTitleButton = document.getElementById("focusTitle");
    var searchInput = document.getElementById("search");
    var categoryFilter = document.getElementById("categoryFilter");
    var sortSelect = document.getElementById("sort");
    var listTitle = document.getElementById("listTitle");
    var taskList = document.getElementById("taskList");
    var emptyState = document.getElementById("empty");
    var toast = document.getElementById("toast");
    var todayLabel = document.getElementById("todayLabel");
    var progressText = document.getElementById("progressText");
    var progressBar = document.getElementById("progressBar");
    var statAll = document.getElementById("statAll");
    var statToday = document.getElementById("statToday");
    var statLate = document.getElementById("statLate");
    var statDone = document.getElementById("statDone");

    /* 필수 HTML 요소가 없으면 안전하게 중단 */
    if (
        !taskForm ||
        !titleInput ||
        !taskList ||
        !searchInput ||
        !categoryFilter ||
        !sortSelect
    ) {
        console.error("오늘해: HTML 요소의 id가 스크립트와 일치하지 않습니다.");
        return;
    }

    /* ==============================
       데이터 저장과 불러오기
    ============================== */

    function loadTasks() {
        var savedData;
        var parsedData;

        try {
            savedData = localStorage.getItem(STORAGE_KEY);

            if (!savedData) {
                tasks = [];
                return;
            }

            parsedData = JSON.parse(savedData);
            tasks = Array.isArray(parsedData) ? parsedData : [];
        } catch (error) {
            console.error("할 일 데이터를 불러오지 못했습니다.", error);
            tasks = [];
        }
    }

    function saveTasks() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
            return true;
        } catch (error) {
            console.error("할 일 데이터를 저장하지 못했습니다.", error);
            showToast("데이터를 저장하지 못했어요.");
            return false;
        }
    }

    /* ==============================
       날짜와 상태 계산
    ============================== */

    function getTodayString() {
        var today = new Date();
        var year = today.getFullYear();
        var month = String(today.getMonth() + 1).padStart(2, "0");
        var day = String(today.getDate()).padStart(2, "0");

        return year + "-" + month + "-" + day;
    }

    function getTaskStatus(task) {
        var today = getTodayString();

        if (task.completed === true) {
            return "completed";
        }

        if (!task.dueDate) {
            return "none";
        }

        if (task.dueDate === today) {
            return "today";
        }

        if (task.dueDate < today) {
            return "overdue";
        }

        return "upcoming";
    }

    function createId() {
        return "task-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
    }

    /* ==============================
       목록 검색, 필터, 정렬
    ============================== */

    function getVisibleTasks() {
        var query = searchInput.value.trim().toLowerCase();
        var selectedCategory = categoryFilter.value;
        var result = tasks.filter(function (task) {
            var status = getTaskStatus(task);
            var taskTitle = String(task.title || "").toLowerCase();
            var taskMemo = String(task.memo || "").toLowerCase();
            var matchesView = currentView === "all" || status === currentView;
            var matchesCategory =
                selectedCategory === "all" || task.category === selectedCategory;
            var matchesSearch =
                query === "" ||
                taskTitle.indexOf(query) !== -1 ||
                taskMemo.indexOf(query) !== -1;

            return matchesView && matchesCategory && matchesSearch;
        });

        return sortTasks(result);
    }

    function sortTasks(taskArray) {
        var priorityOrder = {
            high: 1,
            normal: 2,
            low: 3
        };

        return taskArray.slice().sort(function (first, second) {
            var firstCreated;
            var secondCreated;

            if (sortSelect.value === "due") {
                return String(first.dueDate || "9999-12-31").localeCompare(
                    String(second.dueDate || "9999-12-31")
                );
            }

            if (sortSelect.value === "priority") {
                return (
                    (priorityOrder[first.priority] || 2) -
                    (priorityOrder[second.priority] || 2)
                );
            }

            firstCreated = String(first.createdAt || "");
            secondCreated = String(second.createdAt || "");
            return secondCreated.localeCompare(firstCreated);
        });
    }

    /* ==============================
       할 일 목록 출력
    ============================== */

    function renderTasks() {
        var visibleTasks = getVisibleTasks();

        taskList.innerHTML = "";

        visibleTasks.forEach(function (task) {
            taskList.appendChild(createTaskElement(task));
        });

        if (emptyState) {
            emptyState.classList.toggle("hidden", visibleTasks.length !== 0);
        }

        updateStatistics();
    }

    function createTaskElement(task) {
        var item = document.createElement("li");
        var checkButton = document.createElement("button");
        var content = document.createElement("div");
        var title = document.createElement("h3");
        var meta = document.createElement("div");
        var category = document.createElement("span");
        var priority = document.createElement("span");
        var actions = document.createElement("div");
        var editButton = document.createElement("button");
        var deleteButton = document.createElement("button");
        var status = getTaskStatus(task);
        var priorityLabels = {
            high: "높음",
            normal: "보통",
            low: "낮음"
        };

        item.className = "task" + (task.completed ? " done" : "");

        checkButton.type = "button";
        checkButton.className = "check" + (task.completed ? " done" : "");
        checkButton.setAttribute(
            "aria-label",
            task.completed ? "완료 취소" : "완료 처리"
        );
        checkButton.textContent = task.completed ? "✓" : "";
        checkButton.addEventListener("click", function () {
            toggleTask(task.id);
        });

        title.textContent = task.title;
        meta.className = "meta";

        category.className = "chip";
        category.textContent = task.category || "개인";

        priority.className = "priority " + (task.priority || "normal");
        priority.textContent = priorityLabels[task.priority] || "보통";

        meta.appendChild(category);
        meta.appendChild(priority);

        if (task.dueDate) {
            var dateText = document.createElement("span");
            dateText.textContent =
                task.dueDate + (task.dueTime ? " " + task.dueTime : "");
            meta.appendChild(dateText);
        }

        if (status === "overdue") {
            var overdueText = document.createElement("span");
            overdueText.className = "overdue-label";
            overdueText.textContent = "기한 지남";
            meta.appendChild(overdueText);
        }

        content.appendChild(title);
        content.appendChild(meta);

        actions.className = "actions";

        editButton.type = "button";
        editButton.className = "icon";
        editButton.setAttribute("aria-label", "수정");
        editButton.textContent = "✎";
        editButton.addEventListener("click", function () {
            startEdit(task.id);
        });

        deleteButton.type = "button";
        deleteButton.className = "icon";
        deleteButton.setAttribute("aria-label", "삭제");
        deleteButton.textContent = "×";
        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        item.appendChild(checkButton);
        item.appendChild(content);
        item.appendChild(actions);

        return item;
    }

    /* ==============================
       등록과 수정
    ============================== */

    function handleSubmit(event) {
        var title = titleInput.value.trim();
        var existingTask;
        var now;
        var taskData;

        event.preventDefault();
        titleError.textContent = "";

        if (title === "") {
            titleError.textContent = "할 일 제목을 입력해 주세요.";
            titleInput.focus();
            return;
        }

        existingTask = findTask(taskIdInput.value);
        now = new Date().toISOString();

        taskData = {
            id: existingTask ? existingTask.id : createId(),
            title: title,
            memo: memoInput.value.trim(),
            dueDate: dueDateInput.value,
            dueTime: dueTimeInput.value,
            category: categoryInput.value,
            priority: priorityInput.value,
            completed: existingTask ? existingTask.completed : false,
            createdAt: existingTask ? existingTask.createdAt : now,
            updatedAt: now,
            completedAt: existingTask ? existingTask.completedAt : null
        };

        if (existingTask) {
            tasks = tasks.map(function (task) {
                return task.id === taskData.id ? taskData : task;
            });
            showToast("할 일을 수정했어요.");
        } else {
            tasks.push(taskData);
            showToast("할 일을 등록했어요.");
        }

        if (saveTasks()) {
            resetForm();
            renderTasks();
        }
    }

    function startEdit(taskId) {
        var task = findTask(taskId);

        if (!task) {
            return;
        }

        taskIdInput.value = task.id;
        titleInput.value = task.title || "";
        memoInput.value = task.memo || "";
        dueDateInput.value = task.dueDate || "";
        dueTimeInput.value = task.dueTime || "";
        categoryInput.value = task.category || "개인";
        priorityInput.value = task.priority || "normal";
        formTitle.textContent = "할 일 수정";
        saveButton.textContent = "수정하기";
        cancelEditButton.classList.remove("hidden");
        titleInput.focus();
        window.scrollTo(0, 0);
    }

    function resetForm() {
        taskForm.reset();
        taskIdInput.value = "";
        titleError.textContent = "";
        formTitle.textContent = "새 할 일";
        saveButton.textContent = "저장하기";
        cancelEditButton.classList.add("hidden");
        priorityInput.value = "normal";
    }

    function findTask(taskId) {
        return tasks.find(function (task) {
            return String(task.id) === String(taskId);
        });
    }

    /* ==============================
       완료와 삭제
    ============================== */

    function toggleTask(taskId) {
        var task = findTask(taskId);

        if (!task) {
            return;
        }

        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
        task.updatedAt = new Date().toISOString();

        saveTasks();
        renderTasks();
        showToast(task.completed ? "할 일을 완료했어요." : "완료를 취소했어요.");
    }

    function deleteTask(taskId) {
        var task = findTask(taskId);
        var confirmed;

        if (!task) {
            return;
        }

        confirmed = window.confirm("이 할 일을 삭제할까요?");

        if (!confirmed) {
            return;
        }

        tasks = tasks.filter(function (item) {
            return String(item.id) !== String(taskId);
        });

        saveTasks();
        renderTasks();
        showToast("할 일을 삭제했어요.");
    }

    /* ==============================
       통계와 공통 UI
    ============================== */

    function updateStatistics() {
        var today = getTodayString();
        var todayTasks = tasks.filter(function (task) {
            return getTaskStatus(task) === "today";
        });
        var completedToday = tasks.filter(function (task) {
            return (
                task.completed &&
                task.completedAt &&
                String(task.completedAt).slice(0, 10) === today
            );
        }).length;
        var todayTotal = todayTasks.length + completedToday;
        var completionRate = todayTotal
            ? Math.round((completedToday / todayTotal) * 100)
            : 0;

        progressText.textContent = completionRate + "%";
        progressBar.style.width = completionRate + "%";
        statAll.textContent = tasks.length;
        statToday.textContent = todayTasks.length;
        statLate.textContent = tasks.filter(function (task) {
            return getTaskStatus(task) === "overdue";
        }).length;
        statDone.textContent = tasks.filter(function (task) {
            return task.completed === true;
        }).length;
    }

    function changeView(viewName) {
        var viewTitles = {
            all: "전체 할 일",
            today: "오늘 할 일",
            upcoming: "예정된 할 일",
            completed: "완료한 할 일"
        };
        var viewButtons = document.querySelectorAll("[data-view]");

        currentView = viewName;
        listTitle.textContent = viewTitles[viewName] || "전체 할 일";

        viewButtons.forEach(function (button) {
            button.classList.toggle("active", button.dataset.view === viewName);
        });

        renderTasks();
    }

    function showToast(message) {
        if (!toast) {
            return;
        }

        toast.textContent = message;
        toast.classList.add("show");
        window.clearTimeout(toastTimer);

        toastTimer = window.setTimeout(function () {
            toast.classList.remove("show");
        }, 2200);
    }

    /* ==============================
       이벤트 연결
    ============================== */

    taskForm.addEventListener("submit", handleSubmit);

    cancelEditButton.addEventListener("click", function () {
        resetForm();
    });

    titleInput.addEventListener("input", function () {
        if (titleInput.value.trim() !== "") {
            titleError.textContent = "";
        }
    });

    focusTitleButton.addEventListener("click", function () {
        titleInput.focus();
        window.scrollTo(0, 0);
    });

    searchInput.addEventListener("input", renderTasks);
    categoryFilter.addEventListener("change", renderTasks);
    sortSelect.addEventListener("change", renderTasks);

    document.querySelectorAll("[data-view]").forEach(function (button) {
        button.addEventListener("click", function () {
            changeView(button.dataset.view);
        });
    });

    /* ==============================
       최초 실행
    ============================== */

    if (todayLabel) {
        todayLabel.textContent = new Intl.DateTimeFormat("ko-KR", {
            month: "long",
            day: "numeric",
            weekday: "long"
        }).format(new Date());
    }

    loadTasks();
    renderTasks();
});
