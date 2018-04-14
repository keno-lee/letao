$(function() {


    //拿到本地存储并转换成数组
    function getHistory() {
        var history = localStorage.getItem("history") || '[]';
        var arr = JSON.parse(history);
        return arr;
    }
    //页面渲染函数
    function render() {
        var arr = getHistory();
        $(".lt_history").html(template("historyTmp", { list: arr }));
    }

    // 点击搜索
    // 1.存储本地localstorage(增,删,改,查)
    // 2.发送ajax请求,请求searchList页面

    // 1/查  首先页面一加载,渲染
    render();

    // 2/增
    $(".btn-search").click(function() {
        // 1.获取表单值
        var inputText = $(".search-content").val();
        //获取arr
        var arr = getHistory();

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

        // console.log(arr);

        // 最后, 存储在本地存储中  ****注意要把arr转换成字符串
        localStorage.setItem("history", JSON.stringify(arr));
        // 拿到arr渲染到页面中
        render();

        // 清空表单
        $(".search-content").val('');
        //跳转页面
        location.href = "searchList.html?proName=" + inputText;
    });

    // 3.删除
    // 给每个li下面的btn_delete注册点击事件
    $(".content").on("click", ".btn_delete", function() {
        // 删除当前数据
        var arr = getHistory();
        arr.splice($(this).parent().data("index"), 1);
        localStorage.setItem("history", JSON.stringify(arr));
        render();
    });
    //3-2 删除所有历史记录
    $(".lt_history").on("click", ".btn-empty", function() {
        // 确认框
        mui.confirm("您是否要清空所有历史记录?", "温馨提示", ["取消", "确认"], function(e) {
            if (e.index === 1) {

                localStorage.removeItem("history");
                render();
            }
        });

    });

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


});