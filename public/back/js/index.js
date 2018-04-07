$(function() {

    //退出按钮功能
    $(".icon_exit").on("click", function() {
        $('#exit_modal').modal();
    });

    $(".btn-exit").on("click", function() {
        // alert(1);
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            success: function(info) {
                // console.log(info);
                if (info.success) {
                    location.href = "login.html";
                }
            }
        });
    });

    // 基于准备好的dom，初始化echarts实例
    var echarts1 = echarts.init(document.querySelector('.echarts1'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [200, 1200, 1600, 1300, 1400, 800]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts1.setOption(option1);

    // 基于准备好的dom，初始化echarts实例
    var echarts2 = echarts.init(document.querySelector('.echarts2'));

    // 指定图表的配置项和数据
    var option2 = {
        title: {
            text: '热门品牌销量',
            subtext: '2017年6月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪', '李宁', '新百伦', '阿迪王']
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: 335, name: '耐克' },
                { value: 310, name: '阿迪' },
                { value: 234, name: '李宁' },
                { value: 135, name: '新百伦' },
                { value: 1548, name: '阿迪王' }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts2.setOption(option2);


}); //入口函数