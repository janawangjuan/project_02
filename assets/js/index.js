$(function(){
    var layer = layui.layer;
    function getUserInfo(){
        $.ajax({
            method:'GET',
            url:"/my/userinfo",
            headers:{
                Authorization:localStorage.getItem("token") || ""
            },
            success:function(res){
                if(res.status!==0){
                    return layer.msg("获取用户信息失败！")
                }   
                renderAvater(res.data)
            }
        })
    }
    function renderAvater(user){
        var name = user.nickname || user.username;

        $("#welcom").html(`欢迎 ${name}`);
        if(user.user_pic!==null){
            $(".layui-nav-img").attr("scr",user.user_pic);
            $(".layui-nav-img").show()
            $(".text-avatar").hide();
        }else{
            $(".text-avatar").show();
            $(".text-avatar").html(name[0].toUpperCase());
            $(".layui-nav-img").hide()
        }
    }
    $("#logout").on("click",function(){
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem("token");
            window.location.href="/login.html"
            layer.close(index);
        });
    })
})