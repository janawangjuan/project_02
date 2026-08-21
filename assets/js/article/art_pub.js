$(function(){
    var layer = layui.layer;
    var form = layui.form;
    function initCate(){
        $.ajax({
            method:"GET",
            url:"/my/article/cates",
            success:function(res){
                if (res.status !== 0) { 
                    return layer.msg('初始化文章分类失败！') 
                }
                var optStr = template("optId",res);
                $("[name=cate_id]").html(optStr);
                form.render();
            }
        })
    }
    initEditor();
    $image= $("#image");
    var options = {
        aspectRatio: 400/200,
        preview: '.img-preview'
    }
    $image.cropper(options);
    $("#changePic").on("click",function(){
        $("#fileId").click();
    })
    $("#fileId").on("change",function(e){
       if(e.target.files.length===0){
        return layer.msg("请选择图片");
       }
        var imgSrc = URL.createObjectURL(e.target.files[0]);
        $image.cropper("destroy").attr("src",imgSrc).cropper(options);
    })
    var art_state = '已发布'
    $("#btnSave2").on("click",function(){
        art_state = "草稿"
    })
    $("#form-pub").on("submit",function(e){
        e.preventDefault();
        var fd = new FormData($(this)[0]) // 3. 将文章的发布状态，存到 fd 中
        fd.append('state', art_state);
        $image.cropper('getCroppedCanvas', { 
            // 创建一个 Canvas 画布 
            width: 400, 
            height: 280 
        }).toBlob(function(blob) {
            fd.append('cover_img', blob);
            publishArticle(fd)
        })
        
    })
    function publishArticle(fd){
        $.ajax({
            method:"POST",
            url:"/my/article/add",
            data:fd,
            contentType:false,
            processData:false,
            success:function(res){
                if (res.status !== 0) { 
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！') 
                // 发布文章成功后，跳转到文章列表页面 
                location.href = '/article/art_list.html'
            }
        })

    }
    
    // test code start======
    var res= {
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
    var optStr = template("optId",res);
    $("[name=cate_id]").html(optStr);
    form.render();
    // test code end =======
})