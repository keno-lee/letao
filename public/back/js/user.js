$(function() {

    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function(info) {
                // console.log(info);
                $(".table tbody").html(template("userTmp", info));

            }
        });
    }
    //给按钮注册点击事件
    //需要使用事件委托

    $(".table").on("click", "button", function() {
        // alert(1);
        var id = $(this).parents("tr").data("id");
        var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
        // 打开模态框
        $("#user_modal").modal("show");
        //点击确定按钮,发送ajax请求
        $(".btn-confirm").on("click", function() {
            $.ajax({
                type: "post",
                url: "/user/updateUser",
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function(info) {
                    // console.log(info);
                    if (info.success) {
                        // 操作成功,关闭模态框,重新渲染
                        $("#user_modal").modal("hide");
                        currentPage = 1;
                        render();
                    }
                }
            });
        });

    });
});