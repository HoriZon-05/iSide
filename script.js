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