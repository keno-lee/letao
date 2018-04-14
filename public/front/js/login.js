$(function() {

    // 点击确认按钮进行表单验证
    $(".btn-cofirm").on("click", function() {
        var username = $(".username").val().trim();
        var password = $(".password").val().trim();

        if (username == "") {
            mui.alert("用户名不能为空");
            return;
        }
        if (password == "") {
            mui.alert("密码不能为空");
            return;
        }
        //如果到这一步,说明都不为空.进行ajax请求
        $.ajax({
            url: "/user/login",
            type: 'post',
            data: { username: username, password: password },
            success: function(info) {
                console.log(info); //error:403,密码错误
                if (info.error === 403) {
                    mui.alert("用户名或者密码错误!")
                }
                if (info.success) {
                    // 登录成功,跳转到用户中心
                    // 两种登录,一种是从购物页面或者其他页面跳转过来的,一种是直接登录
                    if (location.search === "") {
                        // 直接登陆的
                        location.href = "user.html";
                    } else {
                        // 从购物页面过来的
                        var last = location.search.replace('?last=', '');
                        location.href = last;
                    }
                }

            }
        })
    });

});