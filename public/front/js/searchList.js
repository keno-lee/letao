$(function () {

    var currentPage = 1;
    var pageSize = 4;

    function getHistory() {
        var history = localStorage.getItem("history") || '[]';
        var arr = JSON.parse(history);
        return arr;
    }


    // 拿到第一个值放进表单中
    var arr = getHistory();
    $(".search-content").val(arr[0]);


    // 点击搜索开始渲染
    $(".btn-search").on("click", function () {
        //修改localstorage
        var arr = getHistory();
        var inputText = $(".search-content").val();
        // 增加两个条件,①如果搜索的内容已经存在过.就把之前存在的删除
        if (arr.indexOf(inputText) != -1) {
            //不等于-1说明存在,返回的是下标
            arr.splice(arr.indexOf(inputText), 1);
        }
        //②如果数组大于10条数据,删除最后一项
        if (arr.length >= 10) {
            arr.pop();
        }

        // 2.想数组第一项添加
        arr.unshift(inputText);
        // 3.存储到本地存储中
        localStorage.setItem("history", JSON.stringify(arr));
        mui('#refreshContainer').pullRefresh().pulldownLoading();
    });



    //给所有的li注册点击事件//price 1升 2降序 sortPrice   num  1升 2将 sortNum
    $(".sortItem").on("tap", function () {
        if ($(this).hasClass("active")) {
            $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        } else {
            $(this).addClass("active").siblings().removeClass("active");
            $(this).siblings().find("i").addClass("fa-angle-down").removeClass("fa-angle-up");
        }
        // 执行一次刷新
        mui('#refreshContainer').pullRefresh().pulldownLoading();
    });

    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    // 重置当前页
                    currentPage = 1;
                    setTimeout(function () {
                        render(function (info) {
                            $(".product ul").html(template("productTmp", info));
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                                        // 重新启用上拉加载
                            mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
                        });
                    }, 500);
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: false, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () {
                    currentPage++;
                    setTimeout(function () {
                        render(function (info) {
                            if (info.data.length == 0) {
                                // 说明没有数据了
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                            } else {
                                $(".product ul").append(template("productTmp", info));
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                            }
                        });
                    }, 500);
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    function render(callback) {
        //获取表单内的值proName
        var proName = $(".search-content").val();
        // 默认降序
        var sortPrice = $(".sortPrice").find("i").hasClass("fa-angle-down") ? 2 : 1;
        var sortNum = $(".sortNum").find("i").hasClass("fa-angle-down") ? 2 : 1;
        // console.log(proName);
        $.ajax({
            url: "/product/queryProduct",
            type: "get",
            data: {
                proName: proName,
                page: currentPage,
                pageSize: pageSize,
                price: sortPrice,
                num: sortNum
            },
            success: function (info) {
                console.log(info);
                callback(info);
            }
        });
    }

});