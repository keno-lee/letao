$(function() {

    //区域滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //获取产品id
    var str = location.search;
    str = str.substr(1);
    arr = str.split("=");
    var productId = arr[1];


    render();
    //给所有的尺码span注册点击事件;
    $(".productInfo").on("click", ".size span", function() {
        // alert(1)
        $(this).addClass("active").siblings().removeClass("active");
    });

    //给加入购物车添加事件
    $(".btn-add").on("click", function() {
        if ($(".size span.active").length === 0) {
            mui.toast('请选择尺码', { duration: '2000', type: 'div' });
        } else {
            var num = mui(".lt_num").numbox().getValue();
            var size = $(".size span.active").text();
            //productId num size
            $.ajax({
                url: "/cart/addCart",
                type: "post",
                data: { num: num, size: size, productId: productId },
                success: function(info) {
                    // console.log(info);
                    if (info.error === 400) {
                        var last = location.href;
                        //未登录,跳转到登录页
                        location.href = "login.html?last=" + last;
                    }
                    if (info.success) {
                        // 确认框
                        mui.confirm("添加成功!", "温馨提示", ["去购物车", "继续浏览"], function(e) {
                            if (e.index === 0) {
                                location.href = "cart.html"; //去购物车
                            }
                        });

                    }
                }
            })

        }
    });



    function render() {
        $.ajax({
            url: "/product/queryProductDetail" + location.search,
            success: function(info) {
                // console.log(info);
                $(".productInfo").html(template("productTmp", info));
                $(".mui-slider").html(template("sliderTmp", info));

                //动态添加的numbox需要手动初始化
                mui(".lt_num").numbox().setOption('max', info.num);
                mui(".lt_num").numbox().setOption('min', 1);

                //动态添加的轮播图需要手动初始化
                //获得slider插件对象
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
                });
            }
        });
    }

});