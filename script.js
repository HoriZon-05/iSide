//深色模式按钮
document.getElementById('darkModeToggle').addEventListener('change', function() {
    const imageLight = document.querySelector('#imageLight');
    const imageDark = document.querySelector('#imageDark');
    const bannerImg = document.querySelector('#bannerImg');
    const movePart = document.querySelector('.movePart');
    const firstPage = document.querySelector('.firstPage');
    const navCorn = document.querySelector('.navCorn');
    const card = document.querySelectorAll('.testimonial');
    const featureCard = document.querySelectorAll('.featureItem');

    if (this.checked) {
        // 切换到深色模式
        imageLight.style.display = 'none';
        imageDark.style.display = 'block';
        document.documentElement.style.setProperty('color-scheme', 'dark');       
        bannerImg.style.filter = 'invert(1) hue-rotate(180deg) brightness(0.8)';
        movePart.style.filter = 'invert(1) hue-rotate(180deg) ';
        firstPage.style.background = 'black';
        featureCard.forEach(function(card) {
            card.style.filter = 'invert(1) hue-rotate(180deg)';
        });
        card.forEach(function(card) {
            card.style.filter = 'invert(1) hue-rotate(180deg) brightness(0.5)';
        });
        document.documentElement.style.transition = 'all 0.5s ease';
    } else {
        // 切换回浅色模式
        imageLight.style.display = 'block';
        imageDark.style.display = 'none';
        document.documentElement.style.setProperty('color-scheme', 'light');
         // 清除 filter 属性
        bannerImg.style.filter = 'none';
        movePart.style.filter = 'none';
        firstPage.style.background = 'white';
    }
});


//  返回顶部按钮
var backToTopButton = document.getElementsByClassName("TOPbutton")[0];

window.onscroll = function() {
    scrollFunction();
};

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


//搜索框
const searchInput = document.getElementById("searchInput");
const glass= document.getElementById("glass");
const REALglass = document.getElementById("REALglassBtn");
const x = document.getElementById("xMark");
glass.addEventListener("click", function() {
    searchInput.style.visibility = "visible";
    searchInput.style.transform = "translateY(1px)";
    searchInput.style.transition = "all 0.5s ease-in-out";
    glass.style.visibility = "visible";
    glass.style.transform = "translateX(-1vw)";
    glass.style.transition = "all 0.5s ease-in-out";
    REALglass.style.visibility  = "visible";
    REALglass.style.transform = "translateX(-3vw)";
    REALglass.style.transition = "all 0.5s ease-in-out";
    x.style.visibility = "visible";
    x.style.transform = "translateX(-4.5vw)";
    x.style.transition = "all 0.5s ease-in-out";
});
document.getElementById("xMark").addEventListener("click", function() { 
    searchInput.style.visibility = "hidden"; // 添加这行代码来隐藏搜索框
    searchInput.style.transform = "translateY(-200px)";
    searchInput.style.transition = "all 0.5s ease-in-out";
    glass.style.transform = "translateX(1vw)";
    glass.style.transition = "all 0.5s ease-in-out";
    REALglass.style.transform = "translateX(3vw)";
    REALglass.style.transition = "all 0.5s ease-in-out";
    REALglass.style.visibility  = "hidden";
    REALglass.style.opacity = "0";
    x.style.transform = "translateX(4.5vw)";
    x.style.transition = "all 0.5s ease-in-out";
    x.style.visibility = "hidden";
});



// 移动端的展开菜单
const unfoldMenuInput = document.querySelector('.unfoldMenu input'); 
const navCorn = document.querySelector('.navCorn');
const submenu = document.querySelector('.submenu');
// 检测屏幕宽度是否小于等于 900px
const mediaQuery = window.matchMedia('(max-width: 900px)');
const at = document.querySelectorAll('.navCorn a');

// 监听 input 的 change 事件
unfoldMenuInput.addEventListener('change', function () {
    if (this.checked) {
            navCorn.classList.remove('negative');
            navCorn.classList.add('active');
        } else {
            navCorn.classList.remove('active');
            navCorn.classList.add('negative');
    }
});
// 监听屏幕宽度变化
mediaQuery.addEventListener('change', (event) => {
    if (!event.matches) {// 屏幕宽度 > 900px 时执行的代码
        navCorn.classList.remove('negative');
        navCorn.classList.add('active');

    }
    else{
        unfoldMenuInput.checked = false;  
        navCorn.classList.remove('active');
        navCorn.classList.add('negative');
    }
});
// 初始加载时判断
if (!mediaQuery.matches) {// 屏幕宽度 > 900px 时执行的代码
    navCorn.classList.remove('negative');
    navCorn.classList.add('active');
    unfoldMenuInput.checked = false;     
}else{
    unfoldMenuInput.checked = false;     
}


//移动端菜单用点击代替悬停
const foldableItems = document.querySelectorAll('.foldable');

// 遍历每个可折叠的菜单项
foldableItems.forEach(item => {
    // 获取对应的子菜单
    const submenu = item.querySelector('.submenu');

    // 监听点击事件
    item.addEventListener('click', function() {
        // 切换子菜单的 active 类
        submenu.classList.toggle('active');
    });
});

//鼠标悬停下拉菜单按钮恢复原色
document.querySelectorAll('.dropdown-menu li a').forEach(link => {
  link.addEventListener('mouseover', () => {
    document.getElementById('PCdownload').style.color = '#555';
  });

  link.addEventListener('mouseout', () => {
    document.getElementById('PCdownload').style.color = ''; // 恢复默认
  });
});

// 在视频还未加载出来之前实现gif占位,加载完成后替换为超清视频
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.videoContainer video'); // 获取视频元素
    const gifPlaceholder = document.querySelector('.videoContainer img'); // 获取GIF占位图
    const loadingText = document.querySelector('.loading-text'); // 获取加载提示文字

    // 预加载视频
    video.preload = 'auto';

    // 监听视频可以播放的事件
    video.addEventListener('canplaythrough', function() {
        // 隐藏GIF和加载文字
        gifPlaceholder.style.display = 'none';
        if (loadingText) loadingText.style.display = 'none';

        // 显示视频并开始播放
        video.style.display = 'block';
        video.play().catch(e => {
            console.log('自动播放被阻止:', e);
            // 如果自动播放被阻止，至少显示视频控件让用户手动播放
        });
    });

    // 错误处理
    video.addEventListener('error', function() {
        gifPlaceholder.src = 'error-placeholder.jpg'; // 替换为错误占位图
        if (loadingText) loadingText.textContent = '视频加载失败，请刷新重试';
        console.error('视频加载错误:', video.error);
    });

    // 开始加载视频（某些浏览器需要触发）
    video.load();
}); 
function handleError() {
    clearInterval(gifInterval);
    gifPlaceholder.style.display  = 'block';
    video.style.display  = 'none';
    if(loadingText) loadingText.textContent  = '视频加载失败，请刷新重试';
}


//图片自动轮播在鼠标悬停时此行暂停
const scrollLines = document.querySelectorAll('.InfiniteScrollLine');

// 启动动画
function startAnimation(line) {
    line.style.animationPlayState = 'running';
}

// 暂停动画
function pauseAnimation(line) {
    line.style.animationPlayState = 'paused';
}

// 鼠标悬停时暂停当前行的动画，离开时恢复
scrollLines.forEach(line => {
    line.addEventListener('mouseenter', () => pauseAnimation(line));
    line.addEventListener('mouseleave', () => startAnimation(line));
});


//盒子浮起效果
function handleScrollAnimation(element) {
    const elementTopPosition = element.getBoundingClientRect().top;
    const elementBottomPosition = element.getBoundingClientRect().bottom;
    const screenPosition = window.innerHeight;

    if (elementTopPosition < screenPosition && elementBottomPosition > screenPosition) {
        element.classList.add('slide-up');
    }
    if (elementTopPosition > screenPosition*1.2) {
        void element.offsetWidth; // 强制重绘
        element.classList.remove('slide-up');

    }
}
(function() {
    const topPageContainer = document.querySelector('.topPageContainer');
    topPageContainer.classList.add('slide-up');
    // handleScrollAnimation(topPageContainer);
})();
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


//接入卡片于testimonial-slider
document.addEventListener('DOMContentLoaded',function() { 
    const testimonialSlider = document.querySelector('.testimonial-slider');
    let partnersData = []; 
    // 1. 获取数据 
    fetch('https://jxk.net.cn/img')  
    .then(response => response.json())  
    .then(data => { 
        if (data.code   === 200 && data.data?.length)   { 
            partnersData = data.data;  
            initCarousel(); 
        } 
    }) 
    .catch(console.error); 
    // 2. 初始化轮播 
    function initCarousel() {
        // 渲染卡片
        renderCards(partnersData);
    } 
    // 3. 渲染卡片 
    function renderCards(data) { 
        testimonialSlider.innerHTML   = '';         
        data.forEach((item) => { 
            const card = document.createElement('div');  
            card.className   = 'card'; 
            card.innerHTML   = ` 
                <div class="testimonial"> 
                    <img src="${item}">  
                </div> 
            `; 
            testimonialSlider.appendChild(card);  
        }); 
    }
});
//4.触摸翻页磁吸效果
// document.querySelector('.testimonial-slider').addEventListener('touchend', () => {
//     const container = document.querySelector('.testimonial-slider');
//     const deltaX = startX - endX; // 滑动总距离
//     const cardWidth = document.querySelector('.card').offsetWidth; // 获取卡片的宽度
//     const limitedMinDist = 0.1 *cardWidth;
//     const limitedMaxDist = 1.1 *cardWidth;
//     if (Math.abs(deltaX) > limitedMaxDist) {
//         const direction = deltaX > 0 ? 'left' : 'right';
//         const currentScroll = container.scrollLeft;
//         const targetScroll = direction === 'left' 
//             ? (currentScroll) 
//             : (currentScroll)
//         container.scrollTo({
//             left: targetScroll,
//             behavior: 'smooth'
//         });
//     }else if (Math.abs(deltaX) < limitedMinDist){
//         // 未达阈值时回弹
//         container.scrollTo({
//             left: container.scrollLeft,
//             behavior: 'smooth'
//         });
//     }else {
//         const direction = deltaX > 0 ? 'left' : 'right';
//         const currentScroll = container.scrollLeft;
//         const targetScroll = direction === 'left' 
//             ? currentScroll + cardWidth 
//             : currentScroll - cardWidth;
        
//         // 平滑滚动到目标位置
//         container.scrollTo({
//             left: targetScroll,
//             behavior: 'smooth'
//         });
//     }
// });

// // document.querySelector('.testimonial-slider').addEventListener('touchmove', function(e) {
// //     if (Math.abs(e.touches.clientX - startX) > 1) { // 仅水平滑动时阻止默认行为
// //         e.preventDefault();
// //     }
// // });


