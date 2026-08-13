const boxes = document.querySelectorAll('.box');
boxes.forEach((box) => {
  box.addEventListener('click', function () {
    boxes.forEach((item) => item.classList.remove('selected'));
    this.classList.add('selected');
    console.log('선택한 색상:', this.dataset.color);
  });
});
