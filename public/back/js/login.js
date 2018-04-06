$(function() {

    //初始化bootstrapValidator
    $("#form").bootstrapValidator({
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //校验的表单-用户名
            username: {
                //校验的内容
                validators: {

                    // 为空校验
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    // 长度校验
                    stringLength: {
                        min: 2,
                        max: 8,
                        message: "用户名应为2~8位"
                    },
                    //callback 专门用于ajax验证失败的提示信息
                    callback: {
                        message: "用户名错误"
                    }
                }
            },
            //校验的表单-密码            
            password: {
                //校验的内容
                validators: {
                    // 为空校验
                    notEmpty: {
                        message: "密码不能为空!"
                    },
                    // 长度校验
                    stringLength: {
                        min: 2,
                        max: 8,
                        message: "密码应为2~8位"
                    },
                    callback: {
                        message: "密码错误!"
                    }
                }
            }
        }

    });

    //当表单通过检验会触发success.form.bv事件
    $("#form").on("success.form.bv", function(e) {
        // 首先禁用submit默认提交功能
        e.preventDefault();
        // alert(1);
        //发送ajax请求,验证用户名和密码
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $("#form").serialize(),
            dataType: "json",
            success: function(info) {
                console.log(info);
                if (info.error === 1000) {
                    // console.log("用户名不存在");
                    $(form).data('bootstrapValidator').updateStatus("username", "INVALID", "callback");

                }
                if (info.error === 1001) {
                    // console.log("密码错误");
                    $(form).data('bootstrapValidator').updateStatus("password", "INVALID", "callback");

                }
                if (info.success) {
                    // console.log("登录成功");
                    location.href = "index.html";
                }


            }
        });
    });

    //重置按钮-->重置表单验证
    $("[type='reset']").on("click", function() {
        $("#form").data("bootstrapValidator").resetForm();
    });

});