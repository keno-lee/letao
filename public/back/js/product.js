$(function() {

    var currentPage = 1;
    var pageSize = 5;

    render();

    //表格数据渲染
    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: { page: currentPage, pageSize: pageSize },
            success: function(info) {
                // console.log(info);
                $(".table tbody").html(template("productTmp", info));


                //分页器生成
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage, //当前页
                    totalPages: Math.ceil(info.total / info.size), //总页数
                    size: "normal", //设置控件的大小，mini, small, normal,large
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



    // 点击添加商品,模态框显示

    $(".btn-add").on("click", function() {
        $("#product_modal").modal("show");
        // 动态生成二级分类secondcateTmp
        $.ajax({
            type: "GET",
            url: "/category/querySecondCategoryPaging",
            data: { page: 1, pageSize: 50 },
            success: function(info) {
                // console.log(info);
                $(".dropdown-menu").html(template("secondcateTmp", info));
            }
        })
    });

    //给所有dropdown-menu下动态生成的a注册点击委托时间;
    $(".dropdown-menu").on("click", "a", function() {
        var brandid = $(this).data('brandid');
        // 拿到品牌id,赋值给隐藏dropdown-input
        // console.log(brandid);
        $('#dropdown-input').val(brandid);
        //改变实现的文字
        $("#dropdownMenu1").text($(this).text());

        //点击后重置表单校验状态
        $("form").data("bootstrapValidator").updateStatus("brandId", "VALID");

    });


    // 全局定义一个数组,用来保存图片
    var picArr = [];
    // 拿到图片的地址
    $("#file").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function(e, data) {
            // console.log(data);
            // data.result.picAddr  data.result.picName 打印了三次,说明上传了三次
            //动态创建img标签
            $(".img-box").prepend('<img id="show-img" src="' + data.result.picAddr + '" width="100">');
            picArr.unshift(data.result);
            // console.log(picArr);
            if (picArr.length > 3) {
                //如果上传图片个数大于3
                //删除img最后一个
                //删除数组最后一个
                $(".img-box img:last-of-type").remove();
                picArr.pop();
            }
            if (picArr.length === 3) {
                // 更新表单状态
                $("form").data("bootstrapValidator").updateStatus("picStatus", "VALID");
            }
        }
    });


    //表单验证
    $("#form").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 校验功能
        fields: {
            //校验字段1
            brandId: {
                //校验器
                validators: {
                    //校验规则
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                //校验器
                validators: {
                    //校验规则
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                //校验器
                validators: {
                    //校验规则
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                //校验器
                validators: {
                    //校验规则
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    // + 表示一个或多个
                    // * 表示零个或多个
                    // ? 表示零个或1个
                    // {n} 表示出现 n 次
                    regexp: {
                        regexp: /^[1-9]*$/,
                        message: "请输入非0开头的数字"
                    }
                }
            },
            size: {
                //校验器
                validators: {
                    //校验规则
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: "请输入32-46之间的尺码"
                    }
                }
            },
            oldPrice: {
                //校验器
                validators: {
                    //校验规则
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                //校验器
                validators: {
                    //校验规则
                    notEmpty: {
                        message: '请输入商品现价'
                    }
                }
            },
            picStatus: {
                //校验器
                validators: {
                    //校验规则
                    notEmpty: {
                        message: '请上传三张图片'
                    }
                }
            }
        }

    });


    // 表单验证成功触发事件
    $("#form").on("success.form.bv", function() {
        var str = $("#form").serialize(); //&picName1=xx&picAddr1=xx&
        str += '&picName1=' + picArr[0].picName1 + '&picAddr1=' + picArr[0].picAddr1;
        str += '&picName2=' + picArr[1].picName2 + '&picAddr2=' + picArr[1].picAddr2;
        str += '&picName3=' + picArr[2].picName3 + '&picAddr3=' + picArr[2].picAddr3;
        // console.log(str);

        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: str,
            success: function(info) {
                // console.log(info);
                if (info.success) {
                    // 关闭模态框
                    $("#product_modal").modal("hide");
                    //重置表单和状态
                    $("#form").data("bootstrapValidator").resetForm(true);
                    //渲染第一页数据
                    currentPage = 1;
                    render();

                }

            }
        });

    });

});