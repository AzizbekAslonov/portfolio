document.getElementById('age').textContent = new Date().getFullYear() - 2003;
let menuLinks = document.querySelectorAll('.menu__link');
let wrapper = document.querySelector('.wrapper');
let firstScreenText = document.querySelector('.screen__content_1');


let pageSlider = new Swiper('.page', {
   simulateTouch: false,
   // Свои классы
   wrapperClass: 'page__wrapper',
   slideClass: 'screen',
   // Vertikalniy slayder
   direction: 'vertical',

   // Kolichestvo
   slidePerViews: 'auto',

   // Vkluchayem paralax
   parallax: true,

   speed: 800,
   // Обновить swiper
   //  при изменении элементов слайдера
   observer: true,
   observeParents: true,
   observeSlideChildren: true,

   mousewheel: {
      sensitivity: 1,
   },
   pagination: {
      el: '.page__pagination',
      type: 'bullets',
      clickable: true,
      bulletClass: 'page__bullet',
      bulletActiveClass: 'page__bullet_active',
   },
   scrollbar: {
      el: '.page__scroll',
      dragClass: 'page__drag-scroll',
      draggable: true,
   },
   breakpoints: {
      480: {
         paralax: false
      },
   },
   init: false,
   on: {
      init() {
         setScrollType();
         menuSlider();
         wrapper.classList.add('loaded');
      },
      // События смены слайда
      slideChange() {
         menuSliderRemove();
         menuLinks[pageSlider.realIndex].classList.add('active')
         animateText();
      },
      resize() {
         setScrollType();
      }
   }

})
// SliderClass.realIndex --> Aktivniy bullet!!!
let nav = document.querySelector('.navbar');
function menuSlider() {
   menuLinks[pageSlider.realIndex].classList.add('active')
   for (let i = 0; i < menuLinks.length; i++) {
      const link = menuLinks[i];
      link.addEventListener('click', (e) => {
         e.preventDefault();
         menuSliderRemove()
         pageSlider.slideTo(i, 800);
         menuLinks[pageSlider.realIndex].classList.add('active')
         nav.classList.toggle('active')
      })
   }
}

function menuSliderRemove() {
   let menuLinkActive = document.querySelector('.menu__link.active');
   if (menuLinkActive) {
      menuLinkActive.classList.remove('active')
   }
}

function setScrollType() {
   if (wrapper.classList.contains('free')) {
      wrapper.classList.remove('free');
      pageSlider.params.freeMode = false;
   }
   for (let index = 0; index < pageSlider.slides.length; index++) {
      const pageSlide = pageSlider.slides[index];
      const pageSlideContent = pageSlide.querySelector('.screen__content')

      if (pageSlideContent) {
         const pageContentHeight = pageSlideContent.offsetHeight;
         if (pageContentHeight > window.innerHeight) {
            wrapper.classList.add('free');
            pageSlider.params.freeMode = true;
            break;
         }
      }
   }
}

function animateText() {
   const currentSlide = pageSlider.slides[pageSlider.realIndex];

   if (currentSlide.dataset.anim === 'true') {
      currentSlide.classList.add('_active');
      currentSlide.setAttribute('data-anim', 'false')
   }

}

pageSlider.init();

// Menu
function typeWriter(selector, txt, speed, i) {
   let el = document.querySelector(selector);
   if (i < txt.length) {
      el.innerHTML += txt[i]
      i++;
      setTimeout(() => {
         typeWriter(selector, txt, speed, i)
      }, speed);
   }
   else {
      setTimeout(() => {
         el.innerHTML = ''
         typeWriter(selector, txt, speed, 0)
      }, 1000);
   }
}
typeWriter('.home-text_3 span', 'Frontend Developer', 200, 0);

document.querySelector('.menu-burger').onclick = () => {
   nav.classList.toggle('active')
}

new Swiper('.swiper-container', {
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
   },
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },
   slidesPerView: 3,
   spaceBetween: 20,
   loop: true,
   speed: 900,
   // Автопрокрутка ==========================
   // autoplay: {
   //    // Пауза между прокруткой
   //    delay: 2000,
   //    // На коньчить на последнем слайде
   //    stopOnLastSlide: true,
   //    // Отключить после ручного переключения(default = false)
   //    disableOnInteraction: false,
   // },
   // Эффекты переключения слайдов_4
   //  coverflow
   effect: 'coverflow',

   // Дополнение к coverflow
   coverflowEffect: {
      // Угл
      rotate: 20,
      // Наложение
      stretch: 50,
      // Тень
      slideShadows: true
   },
   breakpoints: {
      320: {
         slidesPerView: 1,
      },
      720: {
         slidesPerView: 2,
      },
      1100: {
         slidesPerView: 3,
      }
   },
   // Отступ между слайдами ==========================
   spaceBetween: 60,
})