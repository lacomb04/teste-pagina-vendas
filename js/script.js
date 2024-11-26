
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
        delay: 30000,
        disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 0,
});


document.querySelectorAll('.faq-question').forEach((item) => {
    item.addEventListener('click', () => {
        const parent = item.closest('.faq-item');
        parent.classList.toggle('open');
    });
});



