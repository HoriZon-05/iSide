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
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.videoContainer video'); // 获取视频元素
    const gifPlaceholder = document.querySelector('.videoContainer img'); // 获取GIF占位图
    const loadingText = document.querySelector('.loading-text'); // 获取加载提示文字

    let gifPlayTime = 0; // 记录GIF播放的时间
    let gifInterval = setInterval(() => {
        gifPlayTime++; // 每秒增加一次
    }, 1000);

    // 预加载视频
    video.preload = 'auto';

    // 监听视频可以播放的事件
    video.addEventListener('canplaythrough', function() {
        // 清除GIF的计时器
        clearInterval(gifInterval);

        // 隐藏GIF和加载文字
        gifPlaceholder.style.display = 'none';
        if (loadingText) loadingText.style.display = 'none';

        // 显示视频并从GIF播放的时间点开始播放
        video.style.display = 'block';
        video.currentTime = gifPlayTime; // 设置视频的当前时间
        video.play().catch(e => {
            console.log('自动播放被阻止:', e);
            // 如果自动播放被阻止，至少显示视频控件让用户手动播放
        });
    });

    // 错误处理
    video.addEventListener('error', function() {
        gifPlaceholder.style.display = 'block';
        video.style.display = 'none';
        if (loadingText) loadingText.textContent = '视频加载失败，请刷新重试';
        console.error('视频加载错误:', video.error);
    });

    // 开始加载视频（对于某些浏览器需要这个触发）
    video.load();
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