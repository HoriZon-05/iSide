//  返回顶部按钮
var backToTopButton = document.getElementsByClassName("TOPbutton")[0];

window.onscroll = function() {
    scrollFunction();
};

// function scrollFunction() {
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         backToTopButton.style.display = "block";
//     } else {
//         backToTopButton.style.display = "none";
//     }
// }
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
}

backToTopButton.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 添加平滑滚动
    });
}

//鼠标悬停下拉菜单按钮恢复原色
document.querySelectorAll('.dropdown-menu li a').forEach(link => {
  link.addEventListener('mouseover', () => {
    document.getElementById('PCdownload').style.color = '#555';
  });

  link.addEventListener('mouseout', () => {
    document.getElementById('PCdownload').style.color = ''; // 恢复默认
  });
});

// 在视频还未加载出来之前实现gif占位,加载完成后替换为超清视频,从对应秒数开始无缝播放
document.addEventListener('DOMContentLoaded',  function() {
    const video = document.querySelector('.videoContainer  video');
    const gifPlaceholder = document.querySelector('.videoContainer  img');
    const loadingText = document.querySelector('.loading-text'); 
    
    let gifPlayTime = 0;
    let gifInterval = setInterval(() => gifPlayTime++, 1000);
    let hasTriggered = false; // 防止重复执行
 
    // 优化后的播放函数
    function playVideo() {
        if(hasTriggered) return;
        hasTriggered = true;
        
        clearInterval(gifInterval);
        gifPlaceholder.style.display  = 'none';
        if(loadingText) loadingText.style.display  = 'none';
        
        video.style.display  = 'block';
        
        // 确保设置时间在播放前完成 
        video.currentTime  = Math.min(gifPlayTime,  video.duration  || 0);
        
        // 强制重绘确保时间设置生效
        void video.offsetWidth; 
        
        // 使用时间更新事件确保跳转完成 
        video.addEventListener('seeked',  function() {
            video.play().catch(e  => {
                console.log(' 自动播放被阻止:', e);
                video.controls  = true;
            });
        }, { once: true });
    }
 
    // 更可靠的状态检测 
    function checkReadyState() {
        if(video.readyState  >= 3) { // HAVE_FUTURE_DATA
            // 确保有足够数据支持跳转
            video.removeEventListener('progress',  checkReadyState);
            playVideo();
        }
    }
 
    video.preload  = 'auto';
    video.addEventListener('progress',  checkReadyState);
    video.addEventListener('canplay',  playVideo);
    video.addEventListener('error',  handleError);
    video.load(); 
 
    function handleError() {
        clearInterval(gifInterval);
        gifPlaceholder.style.display  = 'block';
        video.style.display  = 'none';
        if(loadingText) loadingText.textContent  = '视频加载失败，请刷新重试';
    }
});

// //图片自动轮播在鼠标悬停时暂停
// const scrollLines = document.querySelectorAll('.InfiniteScrollLine');// 获取所有需要滚动的元素
// function startAnimation() {// 启动动画
//     scrollLines.forEach(line => {
//         line.style.animationPlayState = 'running';
//     });
// }

// function pauseAnimation() {// 暂停动画
//     scrollLines.forEach(line => {
//         line.style.animationPlayState = 'paused';
//     });
// }

// // 鼠标悬停时暂停动画，离开时恢复
// scrollLines.forEach(line => {
//     line.addEventListener('mouseenter', pauseAnimation);
//     line.addEventListener('mouseleave', startAnimation);
// });

function handleScrollAnimation(element) {
    const elementTopPosition = element.getBoundingClientRect().top;
    const elementBottomPosition = element.getBoundingClientRect().bottom;
    const screenPosition = window.innerHeight *1.2 ;

    if (elementTopPosition < screenPosition && elementBottomPosition > screenPosition) {
        element.classList.add('slide-up');
    }
    if (elementTopPosition > screenPosition) {
        element.classList.remove('slide-up');
        void element.offsetWidth; // 强制重绘
    }
}
window.addEventListener('scroll', function() {
    const gallery = document.querySelector('.gallery');
    handleScrollAnimation(gallery);
});
window.addEventListener('scroll', function() {
    const features = document.querySelector('.features');
    handleScrollAnimation(features);
});
window.addEventListener('scroll', function() {
    const team = document.querySelector('.team');
    handleScrollAnimation(team);
});
window.addEventListener('scroll', function() {
    const testimonialSliderContainer = document.querySelector('.testimonial-slider-container');
    handleScrollAnimation(testimonialSliderContainer);
});
//加强滚动防抖,防止页面卡顿
let isScrolling;
window.addEventListener('scroll',  function() {
  window.cancelAnimationFrame(isScrolling); 
  isScrolling = window.requestAnimationFrame(handleScroll); 
});