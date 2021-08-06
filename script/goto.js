let nav = document.querySelector('.navbar');

function goto() {
   let menuLinks = document.querySelectorAll('.menu__link[data-goto]');
   if (menuLinks.length > 0) {

      menuLinks[0].classList.add('active')

      menuLinks.forEach(menuLink => menuLink.addEventListener('click', onMenuClick));

      window.addEventListener('scroll', () => {
         let activeEl = document.querySelector('.menu__link.active');
         activeEl && activeEl.classList.remove('active')

         const scrollPixels = window.scrollY;
         const docHeight = window.innerHeight - document.querySelector('header').offsetHeight;

         const index = Math.floor(scrollPixels / docHeight);
         menuLinks[index] && menuLinks[index].classList.add('active')
      })
   }

   function onMenuClick(e) {
      e.preventDefault();

      let dataBlock = this.dataset.goto;
      if (dataBlock && document.querySelector(dataBlock)) {
         // Заполнен ли это дата атрибут && 
         // Существует ли такой объект
         const gotoBlock = document.querySelector(dataBlock);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top +
            pageYOffset - 0.33 * document.querySelector('header').offsetHeight

         // Close on scroll
         if (nav.classList.contains('_active')) {
            document.body.classList.remove('_lock')
            nav.classList.remove('_active')
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth'
         })

      }
   }
}