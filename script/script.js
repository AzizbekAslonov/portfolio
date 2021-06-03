document.addEventListener('DOMContentLoaded', init)

function init() {
   document.getElementById('age').textContent = new Date().getFullYear() - 2003;
   let menuLinks = document.querySelectorAll('.menu__link');
   let wrapper = document.querySelector('.wrapper');

   if (isMobile.any()) MOBILE_USER()
   else PC_USER()

   function PC_USER() {

      let page = document.querySelector('.page');
      page.classList.add('pk')
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

      // // SliderClass.realIndex --> Aktivniy bullet!!!
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

      function animateText() {
         const currentSlide = pageSlider.slides[pageSlider.realIndex];

         if (currentSlide.dataset.anim === 'true') {
            currentSlide.classList.add('_active');
            currentSlide.setAttribute('data-anim', 'false')
         }

      }

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

         // Управление клавиатурой ==========================
         keyboard: {
            // Включить
            enabled: true,
            // Управление клавиатурами
            pageUpDown: true,
         },

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
               wrapper.classList.add('loaded');
               menuSlider()
            },
            // События смены слайда
            slideChange() {
               menuSliderRemove()
               menuLinks[pageSlider.realIndex].classList.add('active')
               animateText();

            },
            resize() {
               setScrollType();
            }
         }

      })

      pageSlider.init();

   }

   function MOBILE_USER() {
      wrapper.classList.add('loaded');

      const linkGotoUrl = ['.home', '.about', '.services_1', '.services_2', '.works', '.footerblock', '.page__screen_footer_2']
      linkGotoUrl.forEach((url, index) => menuLinks[index].setAttribute('data-goto', url))

      goto()
   }

   // Nav toggle
   document.querySelector('.menu-burger').onclick = () => {
      nav.classList.toggle('_active')
      document.body.classList.toggle('_lock')
   }

   // Animation
   new TypeWriter(document.querySelector('.txt-type'), ["Фронтенд Pазработчик"], 3000);


   // My Works slider
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
      autoplay: {
         // Пауза между прокруткой
         delay: 2000,
         // На коньчить на последнем слайде
         stopOnLastSlide: true,
      },
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
}
