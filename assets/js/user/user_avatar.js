$(function(){
    var $image = $('#image');
    var option={
        aspectRatio:1,
        preview:".img-preview"
    }
    $image.cropper(option);
    $("#upload").on('click',function(){
        $("#files").click()
    })
    $("#files").on("change",function(e){
        var img = URL.createObjectURL(e.target.files[0]);
        $image.cropper("destroy");
        $image.attr("src",img)
        $image.cropper(option)
    })
    $("#btnUpload").on("click",function(){
        var dataURL = $image.cropper("getCroppedCanvas",{
            width:100,
            height:100
        }).toDataURL("image/png");
        $.ajax({
            method:"POST",
            url:'/my/update/avatar',
            data:{
                avatar:dataURL
            },
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg("更换头像失败");
                }
                layui.layer.msg("更换头像成功！");
                window.parent.getUserInfo();
            }
        })
    })

})