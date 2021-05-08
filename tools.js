// 获得当前样式值
// obj 需要获得样式的元素
// attr 需要何种样式
function getStyle(obj,attr) {
    if (window.getComputedStyle){
        return getComputedStyle(obj,null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

// 绑定函数
function bind(obj,eventName,callback) {
    if (obj.addEventListener){
        obj.addEventListener(eventName,callback,false);
    } else {
        obj.attachEvent('on'+eventName,function () {
            callback.call(obj);
        })
    }
}
// 关于class操作
function hasClass(obj,name) {
    var reg=new RegExp('\\b'+name+'\\b');
    return reg.test(obj.className);
}

function addClass(obj,name) {
    if (!hasClass(obj,name)) {
        obj.className+=''+name;
    }
}
function removeClass(obj,name) {
    var reg=new RegExp('\\b'+name+'\\b');
    obj.className=obj.className.replace(reg,'');
}
function toggleClass(obj,name) {
    if (hasClass(obj,name)){
        removeClass(obj,name);
    } else {
        addClass(obj,name);
    }
}

// 匀速运动函数（过渡效果）
function move(obj,attr,target,speed,callback) {
    clearInterval(obj.timer);
    var current=parseInt(getStyle(obj,attr));
    speed=current>target?-speed:speed;
    obj.timer=setInterval(function () {
        var oldValue=parseInt(getStyle(obj,attr));
        var newValue=oldValue+speed;
        obj.style[attr]=newValue+'px';
        if ((speed<0 && newValue<target) || (speed>0 && newValue>target) ){
            newValue=target;
        }
        obj.style[attr]=newValue+'px';
        if (newValue==target){
            clearInterval(obj.timer);
            callback && callback();
        }
    },30)
}