$(function() {

    //已进入页面,判断是否登录.没登录跳转到登录页面
    $.ajax({
        url: "/user/queryUserMessage",
        success: function(info) {
            // console.log(info);
            if (info.error == 400) {
                // 没登录,qudneglu
                location.href = "login.html";
                return;
            }
            $(".userInfo").html(template("userTmp", info));
        }
    });
    //点击退出登录
    $(".btn-logout").on("click", function() {
        $.ajax({
            url: "/user/logout",
            success: function(info) {
                console.log(info);
                if (info.success) {
                    location.href = "login.html";
                }
            }
        })
    });
});