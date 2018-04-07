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
                console.log(info);
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
    })

    //表单验证功能

});