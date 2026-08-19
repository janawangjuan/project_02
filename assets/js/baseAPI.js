$.ajaxPrefilter(function(option){
    option.url = `http://ajax.frontend.itheima.net${option.url}`
    if(option.url.indexOf("/my/")!==-1){
        option.headers = {
            Authorization:localStorage.getItem("token")|| ""
        }
    }
    option.complete=function(res){
        if(res?.responseJSON?.status===1&& res?.responseJSON?.message==="身份认证失败！"){
            localStorage.removeItem("token");
            window.location.href="/login.html"
        }else if(res?.status===0 && res?.statusText==='error'){
            alert("API is error");
        }

    }
})