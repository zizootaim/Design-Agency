// Nav Menu
const menuIcons = document.querySelector('.menu-icons');
const nav = document.querySelector('.nav');

menuIcons.addEventListener('click', () => {
    nav.classList.toggle("show");
});

// Search Modal
const openModalIcon = document.querySelector('.nav .search-icon');
const searchModal = document.querySelector('.search-modal');
const closeModalIcon = searchModal.querySelector('.modal-close-icon');

openModalIcon.addEventListener('click', () => {
    searchModal.classList.add('show');
});

closeModalIcon.addEventListener('click', () => {
    searchModal.classList.remove('show');
});



// Designs Slider
const slider = document.querySelector('.designs-wrapper'),
    slides = slider.querySelectorAll('.design');

let startPos = 0,
    currentIndex = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    isDragging = false,
    animationID = 0;

slides.forEach( (slide,index) => {
    const slideImage = slide.querySelector('img');
    slideImage.addEventListener('dragstart', (e) => e.preventDefault());

    // Touch Events
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);

    // Mouse Events
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mouseleave', touchEnd);
    slide.addEventListener('mousemove', touchMove);
});

function touchStart(index){
    return function (event){
        startPos = getPositionX(event);
        currentIndex = index;
        isDragging = true;
    
        animationID = requestAnimationFrame(animation);
        slider.classList.add('grabbing');
    }
}


function touchEnd(){
    cancelAnimationFrame(animation);
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;
    if(movedBy < -100 && currentIndex < slides.length - 1){
        currentIndex += 1;
    }
    if(movedBy > 100 && currentIndex > 0){
        currentIndex -= 1;
    }

    setPositionByIndex();
    slider.classList.remove('grabbing');
}

function touchMove(event){
    if(isDragging){
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}


function setSliderPosition(){
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex(){
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}

function getPositionX(event){
    return event.type.includes('mouse') ? event.pageX : 
    event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if(isDragging)  requestAnimationFrame(animation);
}