// Бурегер на мобилке в шапке
let burger = document.querySelector(".js-nav-icon");
let nav = document.querySelector(".js-nav");
burger.addEventListener("click", ()=>{
    burger.classList.toggle("open");
    nav.classList.toggle("nav-mobile-active");
    // if(nav.classList.contains('nav-mobile-active')){
    //     document.querySelector("body").style.overflowY = "hidden";
    // }else{
    //     document.querySelector("body").style.overflowY = "auto";
    // }
});


// === Модальное окно ===

// открытие на кнопку модального окна
document.querySelectorAll(".js-modal-btn-open").forEach(elem=>{
    elem.addEventListener("click", ()=>{
        let modal = document.getElementById(elem.dataset.modal);
        modal.parentElement.classList.toggle('wrapper-hide');
        modal.classList.toggle('modal-hide');
        // toggleBodyScroll(modal, "modal-hide");
    });
});

// закрытие модального окна на крестик
document.querySelectorAll(".js-close-modal").forEach(elem=>{
    elem.addEventListener("click", ()=>{
        let modal = document.getElementById(elem.dataset.modal);
        modal.parentElement.classList.toggle('wrapper-hide');
        modal.classList.toggle('modal-hide');
        // toggleBodyScroll(modal, "modal-hide");
    });
});

// закрытие модального окна на ESC
document.addEventListener("keydown", event=>{
    let wrappers = document.querySelectorAll(".js-wrapper");
    wrappers.forEach(wrapper => {
        console.log(wrapper);
        if(!wrapper.classList.contains("wrapper-hide") && event.key == 'Escape'){
            wrapper.classList.add("wrapper-hide");
            wrapper.querySelector('.js-modal').classList.add('modal-hide');
        }
    });
});

// закрытие модального окна на клик вне модального окна
document.querySelectorAll(".js-wrapper").forEach(wrapper=>{
    wrapper.addEventListener('click', event=>{
        if(event.target.classList.contains('js-wrapper')){
            wrapper.classList.add("wrapper-hide");
            wrapper.querySelector('.js-modal').classList.add('modal-hide');
        }
    });
});


// === /Модальное окно/ ===


// === Код формы фидбека ===
const url = 'http://api-tester.local';

let feedbackForm = document.getElementById("feedback-form");
let feedbackName = feedbackForm.querySelector("#name");
let feedbackTelephone = feedbackForm.querySelector("#telephone");
let feedbackBirthDay = feedbackForm.querySelector("#birth-day");
let feedbackBirthTime = feedbackForm.querySelector("#birth-time");
let feedbackProduct = feedbackForm.querySelector("#product");

IMask(
    feedbackTelephone,
    {
      mask: '+{7} (000) 000-00-00'
    }
)

feedbackForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if(feedbackName.value && feedbackTelephone.value){
        
            let response = await fetch(`${url}/feedback`, {
                method: 'POST',
                mode: "cors",
                headers: {
                    Authentication: 'secret',
                    'Content-Type':'application/json;charset=utf-8',
                    'Origin': url,
                },
                body: JSON.stringify({
                    'name': feedbackName.value,
                    'phone': feedbackTelephone.value,
                    'birth_day': feedbackBirthDay.value,
                    'product': feedbackProduct.value,
                    'birth_time': feedbackBirthTime.value,
                })
            }).catch(()=>{
                console.log(":)");
            })
            
            let result = {};
            if(response){
                result = await response.json();
            }else{
                result = {
                    'status': 'fatal-error',
                };
            }


        console.log(result);

        if(result.status == 'success'){
            feedbackForm.style.display = 'none';
            document.getElementById("feedback").querySelector(".modal-content").innerHTML = `
                <h4 style='color:#198754'>Форма успешно отправлена</h4>
            `;
        }else if(result.status == 'fatal-error'){
            feedbackForm.style.display = 'none';
            document.getElementById("feedback").querySelector(".modal-content").innerHTML = `
                <h4 style='color:#dc3545'>При отправке формы произошла ошибка</h4>
            `;
        }else{
            
        }

        console.log(result);
    }
});

// === /Код формы фидбека/ ===


// === Блок услуги ===

document.addEventListener('DOMContentLoaded', () => {
    const width = window.innerWidth
    if (width < 1300){
        var swiper = new Swiper(".mySwiper", {
            effect: "cards",
            grabCursor: true,
        });
        swiper.slideTo(2);
    }

    var swiperSubslider = new Swiper(".js-subslider", {
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },
    });

    // Получаем нужный элемент
    var subSliderNode = document.querySelector('.js-subslider');

    var Visible = function (target, overScrolling = {top: 0, left: 0, right: 0, bottom: 0}) {
        // Все позиции элемента
        var targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top + overScrolling.top,
            left: window.pageXOffset + target.getBoundingClientRect().left + overScrolling.left,
            right: window.pageXOffset + target.getBoundingClientRect().right + overScrolling.right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom + overScrolling.bottom,
            },
            // Получаем позиции окна
            windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
            };

        if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
            targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
            targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
            targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
            // Если элемент полностью видно, то запускаем следующий код
            console.clear();
            console.log('Вы видите элемент :)');
        } else {
            target.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            console.clear();
        };
    };

    var buttons = document.querySelectorAll('.js-change-slide-subslider');
    buttons.forEach(el => el.addEventListener('click', function() {
        swiperSubslider.slideTo(el.dataset.swiperSlideIndex);
        subSliderNode.classList.remove('sub-slider-swiper-hide');
        document.querySelector('.js-ssdt').classList.add('sub-slider-swiper-hide');
        Visible(subSliderNode, {top: 50, left: 50, right: 50, bottom: 50});
    }));
})

// === /Блок услуги/ ===