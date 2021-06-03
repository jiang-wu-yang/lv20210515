(function(){
    var backtop = document.getElementById('backtop');

    backtop.onclick=function(){
        var timer=setInterval(function(){
            document.documentElement.scrollTop -= 100;

            if(document.documentElement.scrollTop <= 0){
                clearInterval(timer)
            }
        },20)
    }

    //监听页面的滚动
    window.onscroll = function(){
        //卷洞值
        var scrollTop = this.document.documentElement.scrollTop || window.scrollY;

        if(scrollTop == 0){
            backtop.style.display='none';
        }else{
            backtop.style.display='block'
        }
    }
})();