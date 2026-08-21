$(function(){
    var layer= layui.layer;
    function initArtCateList(){
        $.ajax({
            method:"GET",
            url:"",
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg("获取失败")
                }
                var stringHTML = template("tplTable",res);
                $("tbody").html(stringHTML)
            }
        })
        
    }
    // mock/userData.js
    const mockArticle ={
        data:[
            { 
                id: 1, 
                name: 'mick', 
                alias: "科技"
            },
            { 
                id: 2, 
                name: 'lily', 
                alias: "财经"
            }
        ]
    } 
    var stringHTML = template("tplTable",mockArticle);
    $("tbody").html(stringHTML);

    var addIndex = null;
    $("#addArtBtn").on("click",function(){
        addIndex = layer.open({
            type:1,
            area:['500px','250px'],
            title: '新增文章',
            content: $("#addArt").html()
        })
    })
    $("body").on("submit","#form-add",function(e){
        e.preventDefault();
        $.ajax({
            method:"POST",
            url:"/my/article/addcates",
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('新增分类失败！')
                }
                initArtCateList();
                layer.msg('新增分类成功！');
                layer.close(addIndex)
            }
        })
    })

    var editIndex = null;
    $("body").on("click",".editArtBtn",function(){
        editIndex=layer.open({
            type:1,
            area:["500px","250px"],
            title:"编辑文章",
            content: $("#editArt").html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            method:"GET",
            url: '/my/article/cates/' + id,
            success:function(res){
                layui.form.val("form-edit",res.data);
            }
        })
    })
    $('body').on("submit","#form-edit",function(e){
        e.preventDefault();
        $.ajax({
            method:"POST",
            url: '/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！') 
                }
                layer.msg('更新分类数据成功！') 
                layer.close(editIndex) 
                initArtCateList()
            }
        })
    })

    $("body").on("click",".deleteBtn",function(){
        var id= $(this).attr("data-id")
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:"POST",
                url:"/my/article/deletecate/"+id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg("删除分类失败！")
                    }
                    layer.msg('删除分类成功！') 
                    layer.close(index) 
                    initArtCateList()
                }
            })
        });
    }) 
})