const wrapper = document.querySelector('.wrapper');
const carousel = document.getElementById('carousel');
const arrowbtns = document.querySelectorAll('.wrapper i');
const fcardwidth = document.querySelector('.wrapper .carousel .card').offsetWidth;
const carouselchildren =[...carousel.children]

let cardperview = Math.round(carousel.offsetWidth / fcardwidth)

carouselchildren.slice(-cardperview).reverse().forEach(card =>{
    carousel.insertAdjacentHTML("afterbegin",card.innerHTML);
});
carouselchildren.slice(0, cardperview).forEach(card =>{
    carousel.insertAdjacentHTML("beforeend",card.outerHTML);
});
let isdrag = false,startX,startscrollleft,timeout;

arrowbtns.forEach(btn => {
    btn.addEventListener('click', () =>{
        carousel.scrollLeft += btn.id === "left" ? -fcardwidth : fcardwidth;
    })
})

const startdrag = (e) =>{
    isdrag = true;
    carousel.classList.add("dragging")
    startX = e.pageX;
    startscrollleft = carousel.scrollLeft;
}
const stopdrag = () => {
    isdrag = false;
    carousel.classList.remove("dragging")
}
const dragging = (e) => {

    if(!isdrag) return
    carousel.scrollLeft = startscrollleft -  (e.pageX - startX);

}
const autoplay = () => {
    if(!window.innerWidth < 800){
        timeout = setTimeout(() => carousel.scrollLeft += fcardwidth, 2500);
    }
}
autoplay()

const infinit = () => {
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-transition")
        carousel.scrollLeft = carousel.offsetWidth - (2 * carousel.offsetWidth)
        carousel.classList.remove("no-transition")


    }
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition")
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition")


    }
    clearTimeout(timeout)
    if(!wrapper.matches(':hover')) autoplay()
}

carousel.addEventListener('mousedown' , startdrag)
carousel.addEventListener('mouseup' , stopdrag)
carousel.addEventListener('mousemove' , dragging)
carousel.addEventListener('scroll' , infinit)
wrapper.addEventListener('mouseenter' , clearTimeout(timeout))
wrapper.addEventListener('mouseleave' , autoplay)


