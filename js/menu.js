(function () {
    var bannernav = document.getElementById('banner-nav');
    var bannerul = document.getElementById('banner-nav-ul');
    //找到所有的menu
    var menus = document.querySelectorAll('.menus-box .menu');
    var bannerli = document.querySelectorAll('#banner-nav-ul li');

    //事件委托
    bannerul.onmouseover = function (e) {
        if (e.target.tagName.toLowerCase() == 'li') {
            //找到data-t的属性
            var t = e.target.getAttribute('data-t');
            //让所有的li去掉current
            for (var i = 0; i < bannerli.length; i++) {
                bannerli[i].className = bannerli[i].getAttribute('data-t');
            }

            //当前碰到的这个li，要加current类
            e.target.className += ' current';

            //寻找匹配的menu
            var themenu = document.querySelector('.menus-box .menu[data-t=' + t + ']');

            //排除其他菜单，让所有menu去掉current
            for (var i = 0; i < menus.length; i++) {
                menus[i].className = 'menu'
            }

            //匹配到的加current
            themenu.className = 'menu current';
        }
    }

    //当鼠标离开大盒子的时候，菜单要关闭
    bannernav.onmouseleave = function () {
        for (var i = 0; i < bannerli.length; i++) {
            bannerli[i].className = bannerli[i].getAttribute('data-t');
            menus[i].className = 'menu';
        }
    }
})();