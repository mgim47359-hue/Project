$(function () {

    // Hide
    $("#btn1").click(function () {
        $(".parent .box1").hide();
    });


    // Show
    $("#btn2").click(function () {
        $(".parent .box1").show();
    });


    // Toggle
    $("#btn3").click(function () {
        $(".parent .box2").toggle();
    });


    // Big
    $("#btn4").click(function () {
        $(".parent .box3").width(400);
        $(".parent .box3").height(400);
    });


    // Small
    $("#btn5").click(function () {
        $(".parent .box3").width(200);
        $(".parent .box3").height(200);
    });

});