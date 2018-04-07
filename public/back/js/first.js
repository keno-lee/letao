$(function() {

    var currentPage = 1;
    var pageSize = 5;
    render();
    // 页面渲染函数
    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: { page: currentPage, pageSize: pageSize },
            success: function(info) {
                // console.log(info);
                $(".table tbody").html(template("firstTmp", info));

                // 生成分页标签
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage, //当前页
                    totalPages: Math.ceil(info.total / info.size), //总页数
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


    // 添加分类功能
    $(".btn-add").on("click", function() {
        // console.log(1);
        // 让模态框显示
        $("#first_modal").modal("show");
    });


    //表单校验
    $("#first-form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验字段
        fields: {
            //字段名
            categoryName: {
                //校验规则(validator:校验器)
                validators: {
                    //校验名
                    notEmpty: {
                        message: "请输入第一分类名"
                    }
                }
            }
        }
    });

    //表单校验成功会触发事件
    $("#first-form").on("success.form.bv", function(e) {

        e.preventDefault();

        //获取表单内容
        var categoryName = $("#first-form input").val();
        // console.log(categoryName);
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: { categoryName: categoryName },
            success: function(info) {
                // console.log(info);
                if (info.success) {
                    //操作成功,关闭模态框,重置表单,刷新页面
                    $("#first_modal").modal("hide");
                    //默认渲染第一页
                    currentPage = 1;
                    render();
                    $("#first-form").data("bootstrapValidator").resetForm(true);
                }

            }
        });

    });





});