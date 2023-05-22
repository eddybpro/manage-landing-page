const menuBtn = document.querySelector('.menu'),
closeBtn = document.querySelector('.close'),
navLinksBox = document.querySelector('.nav-links'),
navLinks = document.querySelectorAll('.nav-link'),
reviewsContainer = document.querySelector('.reviews-container'),
reviewCards = document.querySelectorAll('.review-card'),
cardSliderBtns = document.querySelectorAll('.card-btn'),
goBtn = document.querySelector('.footer-btn'),
emailInput = document.querySelector('.email'),
errorPara = document.querySelector('.error');


const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

goBtn.addEventListener('click', ()=>{
    if(!regex.test(emailInput.value)){
        errorPara.classList.remove('none');
        emailInput.style.color = 'hsl(12, 88%, 59%)';
        emailInput.style.borderColor = 'hsl(12, 88%, 59%)';
    }else{
        errorPara.classList.add('none');
        emailInput.style.borderColor = 'hsl(0, 0%, 100%)';
        emailInput.style.color = 'hsl(227, 12%, 61%)';
    }
})


menuBtn.addEventListener('click', showNav);
closeBtn.addEventListener('click', showNav);

navLinks.forEach(link=>{
    link.addEventListener('click', showNav);
})


function showNav(){
    menuBtn.classList.toggle('none-mobile');
    closeBtn.classList.toggle('none-mobile')
    navLinksBox.classList.toggle('none-mobile');
    document.querySelector('header').classList.toggle('header-bg')
}

if (window.screen.width <= 768) {
    reviewCards.forEach((card, idx)=>{
        card.style.left = `${idx * 100}%`;
    })
    
    const idxVal = localStorage.getItem('index');
    
    reviewCards.forEach(card=>{
        card.style.transform = `translateX(-${idxVal * 100}%)`;
    })
    
    cardSliderBtns[idxVal].style.backgroundColor = 'hsl(12, 88%, 59%)';
    
    cardSliderBtns.forEach((btn, idx)=>{
        btn.addEventListener('click',()=>{
            cardSliderBtns.forEach(btn=>{
                btn.style.backgroundColor ='hsl(0, 0%, 100%)';
            });
            btn.style.backgroundColor = 'hsl(12, 88%, 59%)';
    
            reviewCards.forEach(card=>{
                card.style.transform = `translateX(-${idx * 100}%)`;
                localStorage.setItem('index', `${idx}`);
            })
        })
    })
}else{
    let dragStart = false, prevPageX, prevScrollLeft;

    reviewCards.forEach((card, idx)=>{
        card.style.left = `${idx * 45}rem`;
    })

    reviewsContainer.addEventListener('mousemove', (e)=>{
        if(!dragStart)return;

        e.preventDefault();
        
        let positionDiff = e.pageX - prevPageX;
        reviewsContainer.scrollLeft = prevScrollLeft - positionDiff;
    })

    reviewsContainer.addEventListener('mousedown',(e)=>{
        dragStart= true;
        prevPageX = e.pageX;
        prevScrollLeft = reviewsContainer.scrollLeft;
    })

    reviewsContainer.addEventListener('mouseup',()=>{
        dragStart=false;
    })
}

