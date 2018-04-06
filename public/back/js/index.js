$(function() {

    $(".cate_mana").on("click", function() {
        $(".cate_menu").slideToggle();
    });
    // 侧边栏隐藏按钮
    $(".icon_menu").on("click", function() {
        $(".lt_aside").toggleClass("hidemenu");
        $(".lt_topbar").toggleClass("hidemenu");
        $(".lt_content").toggleClass("hidemenu");
    });

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
});