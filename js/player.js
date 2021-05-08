window.onload=function () {
    let video=document.querySelector('video');
    let controlWrap=document.querySelector('.control-wrap');
    let startWrap=document.querySelector('.start');
    let starBtn=document.querySelector('.start span');
    let stopWrap=document.querySelector('.stop');
    // let stopBtn=document.querySelector('.stop span');
    let timeCurrent=document.querySelector('.time-current');
    let timeAll=document.querySelector('.time-all');
    let progressWrap1=document.querySelector('#timeProgress')
    let progressAll1=document.querySelector('#timeProgress .progress-all');
    let progressBtn1=document.querySelector('#timeProgress .progress-btn');
    let progressCurrent1=document.querySelector('#timeProgress .progress-current');
    let progressWrap2=document.querySelector('#volumnProgress')
    let progressAll2=document.querySelector('#volumnProgress .progress-all');
    let progressBtn2=document.querySelector('#volumnProgress .progress-btn');
    let progressCurrent2=document.querySelector('#volumnProgress .progress-current');
    let mutedBtnWrap=document.querySelector('.muted-btn');
    let mutedBtn=document.querySelector('.muted-btn span');
    let fullScreenWrap=document.querySelector('.full-screen');
    let fullScreenBtn=document.querySelector('.full-screen span');
    let flag=true;//是否暂停
    let full=false;//是否全屏


    // 初始化视频大小
    video.width=document.documentElement.clientWidth;
    video.height=document.documentElement.clientHeight-controlWrap.clientHeight;

    window.onresize=function(){
        video.width=document.documentElement.clientWidth;
        video.height=document.documentElement.clientHeight-controlWrap.clientHeight;
    }
    // 总时长设置
    video.addEventListener('loadeddata',function () {
        timeAll.innerHTML=timeTrans(video.duration);
    })
    // 实时更新
    setInterval(function () {
        // 当前时长显示
        timeCurrent.innerHTML=timeTrans(video.currentTime);
        // 时长比值
        let size=video.currentTime/video.duration;

        progressBtn1.style.left=progressCurrent1.style.width=size*(progressAll1.clientWidth-progressBtn1.offsetWidth)+'px';
        if (video.currentTime==video.duration){
            removeClass(starBtn,'active');
            flag=true;
        }

    },100)
    // 时间设置

    //播放按钮
    startWrap.onclick=function () {
        // 切换图片
        if(flag){
            addClass(starBtn,'active');
            video.play();
        }else {
            removeClass(starBtn,'active');
            video.pause();
        }
        flag=!flag;
    }
    // 暂停按钮
    stopWrap.onclick=function () {
        removeClass(starBtn,'active');
        video.pause()
        video.currentTime=0;
    }
    // 进度条
    progressWrap1.onclick=function (ev) {
        ev=ev||event;
        addClass(starBtn,'active');
        let dis=ev.clientX-this.offsetLeft;
        progressCurrent1.style.width=progressBtn1.style.left=dis+'px';
        video.currentTime=video.duration*dis/(progressAll1.clientWidth-progressBtn1.offsetWidth);
        video.play();

    }
    // 拖拽时长进度小滑块
    let callback1={
        move:function () {
            progressCurrent1.style.width=this.offsetLeft+'px';
            let scale=this.offsetLeft/(progressAll1.clientWidth-progressBtn1.offsetWidth);
            video.currentTime=video.duration*scale;
        }
    }
    $.drag(progressBtn1,callback1);
    //静音按钮
    mutedBtnWrap.onclick=function () {
        if (video.muted){
            video.muted=false;
            video.volume=.8;
            removeClass(mutedBtn,'active');
            progressBtn2.style.left=progressCurrent2.style.width=(progressAll2.clientWidth-progressBtn2.offsetWidth)/1.25+'px';
        }else {
            video.muted=true;
            video.volume=0;
            progressBtn2.style.left=progressCurrent2.style.width=0;
            addClass(mutedBtn,'active');
        }
    }
    // 音量设置
    progressBtn2.style.left=progressCurrent2.style.width=(progressAll2.clientWidth-progressBtn2.offsetWidth)/1.25+'px';
    // 拖拽音量进度小滑块
    let callback2={
        move:function () {
            progressCurrent2.style.width=this.offsetLeft+'px';
            let scale2=this.offsetLeft/(progressAll2.clientWidth-progressBtn2.offsetWidth);
            if (scale2===0){
                video.muted=true;
                addClass(mutedBtn,'active');
            }else {
                video.muted=false;
                removeClass(mutedBtn,'active')
            }
            video.volume=scale2;
        }
    }
    $.drag(progressBtn2,callback2);

    // 音量进度条
    progressWrap2.onclick=function (ev) {
        ev=ev||event;
        let dis2=ev.clientX-this.getBoundingClientRect().left;
        progressCurrent2.style.width=progressBtn2.style.left=dis2+'px';

    }

    // 全屏
    fullScreenWrap.onclick=function(){
        if(full) {
            // 全屏 ---> 不是全屏 --> remove
            removeClass(fullScreenBtn,"active")
            full = false
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            addClass(fullScreenBtn,"active")
            full = true
            var docElm = document.documentElement;
            //W3C
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            //FireFox
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            //Chrome等
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
            //IE11
            else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        }
    }




    // 工具类
    function timeTrans(num) {
        let h=Math.floor(num/3600);
        let m=Math.floor((num%3600)/60);
        let s=Math.floor((num%3600)%60);
        if (h<10){h='0'+h;}
        if (m<10){m='0'+m;}
        if (s<10){s='0'+s;}
        return h+':'+m+':'+s;
    }

    function addClass(node,className){
        let reg=new RegExp("\\b"+className+"\\b");
        if(!reg.test(node.className)){
            node.className +=(" "+className);
        }
    }

    function removeClass(node,className){
        if(node.className){
            let reg=new RegExp("\\b"+className+"\\b");
            let classes = node.className;
            node.className=classes.replace(reg,"");
            if(/^\s*$/g.test(node.className)){
                node.removeAttribute("class");
            }
        }else{
            node.removeAttribute("class");
        }
    }

}
