$(function() {
    //一级分类
    $.ajax({
        url: "/category/queryTopCategory",
        success: function(info) {
            console.log(info);
            $(".cateTop").html(template("topTmp", info));
            // 渲染第一页
            var id = $(".cateTop li:first-child").data("id");
            render(id);
        }
    });


    //给li注册点击事件,拿到id,调用render();
    $(".cateTop").on("click", "li", function() {
        var id = $(this).data("id");
        render(id);
        $(this).addClass("current").siblings().removeClass("current");
    });



    // 二级分类
    function render(id) {
        $.ajax({
            url: "/category/querySecondCategory",
            data: { id: id },
            success: function(info) {
                // console.log(info);
                $(".cateSec").html(template("secTmp", info));
            }
        });
    }

});