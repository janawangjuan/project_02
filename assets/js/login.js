$(function(){
    $("#reg-btn").on("click",function(){
        $(".login-box").hide();
        $(".reg-box").show()
    })
    $("#login-btn").on("click",function(){
        $(".login-box").show();
        $(".reg-box").hide()
    })
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            var pwd = $(".reg-box input[name=password]").val();
            if(pwd!==value){
                return "两次输入的密码不一致"
            }
        }
    })
    var layer = layui.layer;
    $("#regForm").on("submit",function(e){
        e.preventDefault();
        const data = {
            username:$("#regForm input[name=username").val(),
            password:$("#regForm input[name=password").val()
        }
        $.ajax({
            method:"post",
            url:"/api/reguser",
            data:data,
            success:function(res){
                console.log(res)
            },
            error:function(err){
                layer.msg("API is error!")
            }
        })
        // http://api-breakingnews-web.iteima.net/
        // http://ajax.frontend.itheima.net/api/reguser
    })

    $("#loginForm").submit(function(e){
        e.preventDefault();
        $.ajax({
            method:"post",
            url:"/api/login",
            data:$(this).serialize(),
            success:function(res){
                console.log(res)
                if (res.status !== 0) { return layer.msg('登录失败！') }
                layer.msg("登陆成功")
                localStorage.setItem("token",res.token);
                window.location.href = 'index.html'
            },
            error:function(err){
                layer.msg("API is error!")
            }
        })
        
    })
})