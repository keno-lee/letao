$(function () {

    // 注册编辑和删除功能
    var id;
    // 1.删除 结束后触发下拉刷新
    $(".lt_main").on("tap", ".btn-del", function () {
        id = $(this).parents("li").data("id");
        // console.log(id);
        mui.confirm('您确认删除该商品吗?', '温馨提示', ['取消', '确认'], function (e) {
            if (e.index === 1) {
                $.ajax({
                    url: "/cart/deleteCart",
                    data: {
                        id: id
                    },
                    success: function (info) {
                        console.log(info);
                        if (info.success) {
                            // render();
                            mui('#refreshContainer').pullRefresh().pulldownLoading();
                        }
                    }

                })
            }
        })
    });

    // 2.编辑
    $(".lt_main").on("tap", ".btn-edit", function () {
        var data = $(this).parents("li")[0].dataset;
        console.log(data);


        var htmlStr = template("htmlStr", data);
        htmlStr = htmlStr.replace(/\n/g, '');
        mui.confirm(htmlStr, '温馨提示', ['取消', '确认'], function (e) {
            if (e.index === 1) {
                //确认按钮,拿到id size num 
                var num = mui(".lt_num").numbox().getValue();
                var size = $(".lt_size span.active").text();
                console.log(num, size, data.id);

                $.ajax({
                    url: "/cart/updateCart",
                    type: "post",
                    data: {
                        id: data.id,
                        size: size,
                        num: num
                    },
                    success: function (info) {
                        console.log(info);
                        if (info.success) {
                            mui('#refreshContainer').pullRefresh().pulldownLoading();
                        }

                    }
                });
            }
        });
        //给所有的尺码span注册点击事件;
        $(".lt_size span").on("click", function () {
            // alert(1)
            $(this).addClass("active").siblings().removeClass("active");
        });
        // 进行input数字框初始化
        mui('.mui-numbox').numbox();
    });


    //初始化区域滚动
    // mui('.mui-scroll-wrapper').scroll({
    //     scrollY: true, //是否竖向滚动
    //     scrollX: false, //是否横向滚动
    //     startX: 0, //初始化时滚动至x
    //     startY: 0, //初始化时滚动至y
    //     indicators: true, //是否显示滚动条
    //     deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    //     bounce: true //是否启用回弹
    // });

    mui.init({
        pullRefresh : {
          container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
          down : {
            height:50,//可选,默认50.触发下拉刷新拖动距离,
            auto: true,//可选,默认false.首次加载自动下拉刷新一次
            contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            callback: function () {
                setTimeout(function () {
                    render();
                },500);
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });

      function render() {
        $.ajax({
            url: "/cart/queryCart",
            success: function (info) {
                console.log(info);
                if (info.error === 400) {
                    var last = location.href;
                    location.href = "login.html?last=" + last;
                    return;
                }
                $(".lt_main ul").html(template("cartTmp", {
                    list: info
                }));
              mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
            }
        });
    }

});