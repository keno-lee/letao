$(function() {


    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: { page: currentPage, pageSize: pageSize },
            success: function(info) {
                // console.log(info);
                $(".table tbody").html(template("secondTmp", info));

                //生成分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    size: "small", //设置控件的大小，mini, small, normal,large
                    itemTexts: function(type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },
                    onPageClicked: function(event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }

    // 点击添加功能
    $(".btn-add").on("click", function() {
        $("#second_modal").modal("show");
        //添加模态框显示的时候,渲染下拉菜单的内容
        $.ajax({
            type: 'get',
            url: "/category/queryTopCategoryPaging",
            data: { page: 1, pageSize: 100 },
            success: function(info) {
                // console.log(info);
                $(".dropdown-menu").html(template("firstcateTmp", info));
            }
        })
    });
    //渲染之后给每个选项注册点击事件
    $(".dropdown-menu").on("click", "li", function() {
        $("#dropdownMenu1").text($(this).children("a").text());
        $("#dropdown-input").val($(this).data("categoryid"));
        $("#second-form").data("bootstrapValidator").updateStatus("categoryId", "VALID");

    });
    //upload插件
    $('#file').fileupload({
        dataType: 'json',
        done: function(e, data) {
            // console.log(data.result.picAddr);
            //拿到图片路径赋值给img的src
            $("#show-img").attr("src", data.result.picAddr);
            //给brandLogo设置value
            $('#brandLogo').val(data.result.picAddr);
            //重置表单校验状态
            $("#second-form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");

        }
    });

    //表单验证功能
    $("#second-form").bootstrapValidator({
        //把excluded重置为空,去掉':disabled', ':hidden', ':not(:visible)'
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 校验区
        fields: {
            categoryId: {
                // 校验规则
                validators: {
                    // 非空
                    notEmpty: {
                        //提示文本
                        message: "请选择一级分类名"
                    }
                }
            },
            // 校验字段
            categoryName: {
                // 校验规则
                validators: {
                    // 非空
                    notEmpty: {
                        //提示文本
                        message: "请输入二级分类名"
                    }
                }
            },
            brandLogo: {
                // 校验规则
                validators: {
                    // 非空
                    notEmpty: {
                        //提示文本
                        message: "请上传图片"
                    }
                }
            }
        }
    });

    //表单校验成功触发
    $("#second-form").on("success.form.bv", function() {
        // console.log($(this).serialize());
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: $("#second-form").serialize(),
            success: function(info) {
                // console.log(info);
                if (info.success) {
                    //添加成功,关闭模态框,刷新页面,重置表单
                    $("#second_modal").modal("hide");
                    currentPage = 1;
                    render();
                    $("#second-form").data("bootstrapValidator").resetForm(true);
                    //有两个不是表单
                    $("#show-img").attr("src", "./images/none.png");
                    $("#dropdownMenu1").text("请选择一级分类");

                }
            }
        });
    });
});