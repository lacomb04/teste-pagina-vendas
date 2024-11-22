
const swiper = new Swiper('.imagens-destaque', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 3000, // Troca automática a cada 3 segundos
    },
    slidesPerView: 1, // Exibe um slide por vez em telas pequenas
    spaceBetween: 20, // Espaçamento entre slides
    breakpoints: {
      768: {
        slidesPerView: 2, // Dois slides em telas médias
      },
      1024: {
        slidesPerView: 3, // Três slides em telas grandes
      },
    },
  });
