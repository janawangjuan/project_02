$(function(){
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据 
        pagesize: 2, // 每页显示几条数据，默认每页显示2条 
        cate_id: '', // 文章分类的 Id 
        state: '' // 文章的发布状态
    }
    var layer=layui.layer;
    var form = layui.form;
    function initTable(){
        $.ajax({
            method:"GET",
            url:"/my/article/list",
            data:q,
            success:function(res){
                if(res.status!==0){return layer.msg("获取文章列表失败！")}
                var htmlStr = template("listTable",res);
                $("tbody").html(htmlStr);
                renderPage(res.total);
            }
        })
    }
    template.defaults.imports.dataFormat = function(val){
        return "abc"
    }
    

    function initCate(){
        $.ajax({
            method:"GET",
            url:"/my/article/cates",
            success:function(res){
                if(res.status!==0){
                    return layer.msg("获取分类数据失败！")
                }
                var optStr = template("optList",res);
                $("[name=cate_id]").html(optStr);
                form.render();
            }
        })
    }
    // *** temporary annotation content start 
    // initCate();
    // initTable()
    // *** temporary annotation content end 
    

    // test code start
    // mock data
    var  mockListData={
        data:[
        {
            id:1,
            title:"yes",
            cate_name:"lily",
            pub_date:"203",
            state:"草稿"
        },
        {
            id:2,
            title:"no",
            cate_name:"wick",
            pub_date:"203",
            state:"已发布"
        },
        {
            id:3,
            title:"why",
            cate_name:"smock",
            pub_date:"203",
            state:"已发布"
        }
    ]
    } 
    var htmlStr = template("listTable",mockListData);
    $("tbody").html(htmlStr);
    var tmpData ={
        data:[
            {
                name:"AA",
                Id:"aa"
            },
            {
                name:"BB",
                Id:"bb"
            }
        ]
    }
    var optStr = template("optList",tmpData);
    $("[name=cate_id]").html(optStr);
    form.render();
    var total = 17;
    renderPage(total)
    // test code end
    
    $("#form-search").on("submit",function(e){
        e.preventDefault();
        var cateId = $("[name=cate_id]").val();
        var state = $("[name=state]").val();
        q.cate_id = cate_id
        q.state = state;
        initTable();
    })
    function renderPage(total){
        layui.use('laypage', function(){
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                elem: 'pageBox', //注意，这里 是 ID，不用加 # 号
                count: total, //数据总数，从服务端得到
                limit: q.pagesize,
                limits:[2,4,6,8],
                curr:q.pagenum,
                layout:['count','limit','prev', 'page', 'next','skip'],
                jump:function(obj,first){
                    //首次不执行
                    q.pagesize = obj.limit
                    q.pagenum = obj.curr;
                    if(!first){
                        initTable();
                    }
                }
            });
        });
    }
    $("body").on("click",".delete-btn",function(){
        var deleteBtn = $(".delete-btn").length;
        var id = $(this).attr("data-id")
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:"GET",
                url:'/my/article/delete/'+ id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！');
                    if(deleteBtn.length===1){
                        q.pagenum = q.pagenum ===1? 1:q.pagenum-1;
                    }
                    initTable();
                    layer.close(index);
                }
            })
        
        });
    })

    
})