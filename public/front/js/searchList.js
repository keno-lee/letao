$(function() {



    var currentPage = 1;
    var pageSize = 5;
    //初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: true, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });

    function getHistory() {
        var history = localStorage.getItem("history") || '[]';
        var arr = JSON.parse(history);
        return arr;
    }


    // 拿到第一个值放进表单中
    var arr = getHistory();
    $(".search-content").val(arr[0]);


    // 进入页面开始渲染
    render();

    // 点击搜索开始渲染
    $(".btn-search").on("click", function() {
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
        render();
    });

    function render() {
        //获取表单内的值proName
        var proName = $(".search-content").val();
        console.log(proName);
        $.ajax({
            url: "/product/queryProduct",
            type: "get",
            data: {
                proName: proName,
                page: currentPage,
                pageSize: pageSize
            },
            success: function(info) {
                // console.log(info);
                $(".product ul").html(template("productTmp", info));
            }
        });
    }

});