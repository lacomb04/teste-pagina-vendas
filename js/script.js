document.addEventListener('DOMContentLoaded', () => {
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
            delay: 20000,
        },
        slidesPerView: 1,
        spaceBetween: 0,
    });
});

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
        delay: 3000,
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



