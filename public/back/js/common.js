$(function() {

    //进度条功能

    // AJAX全局函数
    $(document).ajaxStart(function() {
        NProgress.start();

    });
    $(document).ajaxStop(function() {
        NProgress.done();
    });


});