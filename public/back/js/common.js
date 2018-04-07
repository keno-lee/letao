$(function() {


    // 登录判断功能
    // 页面一加载

    //判断如果是登录页面就不再验证
    //console.log(location.href.indexOf("login.html") === -1);

    if (location.href.indexOf("login.html") === -1) {
        $.ajax({
            type: "get",
            url: "/employee/checkRootLogin",
            success: function(info) {
                // console.log(info);
                //{error: 400, message: "未登录！"}
                if (info.success) {
                    //已登录,不做任何操作
                }
                if (info.error === 400) {
                    // 未登录,跳转到登录页面
                    location.href = "login.html";
                }
            }
        });
    } else {
        //说明存在login.html,不执行
    }

    //退出按钮功能
    $(".icon_exit").on("click", function() {
        $('#exit_modal').modal();
    });

    $(".btn-exit").on("click", function() {
        // alert(1);
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            success: function(info) {
                // console.log(info);
                if (info.success) {
                    location.href = "login.html";
                }
            }
        });
    });



    // 侧边栏隐藏
    $(".cate_mana").on("click", function() {
        $(".cate_menu").slideToggle();
    });
    // 侧边栏隐藏按钮
    $(".icon_menu").on("click", function() {
        $(".lt_aside").toggleClass("hidemenu");
        $(".lt_topbar").toggleClass("hidemenu");
        $(".lt_content").toggleClass("hidemenu");
    });


    //进度条功能
    // AJAX全局函数
    $(document).ajaxStart(function() {
        NProgress.start();
    });
    $(document).ajaxStop(function() {
        NProgress.done();
    });




});