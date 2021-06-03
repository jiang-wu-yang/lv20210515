//轮播图特效
(function () {
    //得到元素
    var carouse = document.getElementById('carouse');
    var leftbtn = document.getElementById('leftbtn');
    var rightbtn = document.getElementById('rightbtn');
    var circles = document.getElementById('circles');
    var circlesli = circles.getElementsByTagName('li');
    var banner = document.getElementById('banner');
    //克隆第一张li
    var cloneli = carouse.firstElementChild.cloneNode(true);
    //上传到DOM树
    carouse.appendChild(cloneli);

    //当前长在显示的图片序号，从0开始  
    var idx = 0;

    //节流锁
    var lock = true;

    //右按钮监听事件
    rightbtn.onclick = rightbtnhand;

    //右按钮事件处理函数
    function rightbtnhand() {
        //判断节流锁的状态，如果是关闭，就什么都不做
        if (!lock) return;
        //关锁
        lock = false;
        //加上过度
        carouse.style.transition = 'transform .5s ease 0s';

        idx++;
        carouse.style.transform = 'translateX(' + -16.66 * idx + '%)';

        //判断是否是最后一张
        if (idx > 4) {
            setTimeout(function () {
                //去掉过度
                carouse.style.transition = 'none';
                //删除tranform属性
                carouse.style.transform = 'none';
                //全局图片序列号变为0
                idx = 0;
            }, 500);
        }
        //设置小圆点
        setcircles();

        //动画结束后开锁
        setTimeout(function () {
            lock = true;
        }, 500)
    }

    //左按钮事件监听
    leftbtn.onclick = function () {
        //判断节流锁的状态，如果是关闭，就什么都不做
        if (!lock) return;
        //关锁
        lock = false;
        //左按钮要先写if语句
        if (idx == 0) {
            //拉动到最后
            carouse.style.transition = 'none';
            //瞬间拉到最后
            carouse.style.transform = 'translateX(' + -16.66 * 5 + '%)';
            //改变idx值
            idx = 4;

            //延迟0毫秒，可以让刚才的瞬间移动发生后，再把过度加上
            setTimeout(function () {
                //加上过度
                carouse.style.transition = 'transform .5s ease 0s';
                carouse.style.transform = 'translateX(' + -16.66 * 4 + '%)';
            }, 0)
        } else {
            idx--;
            //拉动
            carouse.style.transform = 'translateX(' + -16.66 * idx + '%)';
        }
        //设置小圆点
        setcircles();

        //动画结束后开锁
        setTimeout(function () {
            lock = true;
        }, 500)
    }

    //设置圆点的current在谁身上，序号为idx
    function setcircles() {
        //遍历0,1,2,3,4,每遍历一个数字，都和idx对比，如果相等，就把current加上
        for (var i = 0; i <= 4; i++) {
            if (i == idx % 5) {
                circlesli[i].className = 'current';
            } else {
                circlesli[i].className = '';
            }
        }
    }


    //事件委托，小圆点的监听
    circles.onclick = function (e) {
        if (e.target.tagName.toLowerCase() == 'li') {
            //得到li身上的data-n属性
            var n = Number(e.target.getAttribute('data-n'));

            //改变idx
            idx = n;
            //拉动
            carouse.style.transform = 'translateX(' + -16.66 * idx + '%)';

            //调用函数
            setcircles();
        }
    }


    //定时器控制自动轮播
    var timer=setInterval(rightbtnhand, 2000);

    //鼠标进入
    banner.onmouseenter = function(){
        clearInterval(timer);
    }
    //鼠标离开
    banner.onmouseleave = function(){
        //设表先关
        clearInterval(timer);
        //设置定时器
        timer=setInterval(rightbtnhand, 2000);
    }
})();