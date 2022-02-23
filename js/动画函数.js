function animation(obj, target, callback) {          //这里对动画进行函数封装，可以多次调用  如span和div同时调用
    clearInterval(obj.timer);   //在点击事件中，每点击一次，会调用函数（定时器一次），这会导致定时器的叠加，速度越来越快，通过在定时器前面添加清除上一次的定时器来处理这种bug
    obj.timer = setInterval(function fn() {       //这里采用obj.timer而不是用var 来定义，目的是采用不同的对象设置不同的定时器，放置定时器冲突
        if (obj.offsetLeft == target) {      //距离大于等于100时停止动画
            clearInterval(obj.timer);
            console.log(obj.offsetLeft);
            // if (callback) {
            //     // span.style.backgroundColor = '';   //回调函数所做的事情
            //     callback();                //这里设置回调函数，当定时器结束之后，先进行判断是否有回调函数，有就调用
            // }
            // 利用逻辑门运算
            callback && callback();   //对于逻辑与，如果前面存在，或是true，那么就执行后面的函数，没有就不看后面内容
        }
        // obj.style.left = obj.offsetLeft + 1 + 'px';       //使当前盒子位置发生变化，用定时器来重复做，一般动画
        var step = (target - obj.offsetLeft) / 10;    //设置缓动动画计算公式   通过Math.ceil取上整数
        step = step > 0 ? Math.ceil(step) : Math.floor(step);    //这里设置判断条件，如果是正值，则向上取整，负值则向下取整
        obj.style.left = obj.offsetLeft + step + 'px';     //设置缓动动画
    }, 10);
}