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