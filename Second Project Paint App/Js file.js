const canvas = document.querySelector('canvas')
const draw = canvas.getContext('2d')
const brushWidth = document.querySelector('#range')
const brushcolor = document.querySelector('#color-picker')
const brush = document.querySelector('.brush')
const eraser = document.querySelector('.eraser')
const choosecolor = document.querySelector('.color')
const clearbtn = document.querySelector('.clear')
const savebtn = document.querySelector('.save')
let currentWidth = 5
let currentcolor = ''
window.addEventListener('load' , () =>{
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    draw.fillStyle = "#e2e1e1"
    draw.fillRect(0,0,canvas.offsetWidth,canvas.offsetHeight)
})
function startDraw(event){
    isDrawing = true
    draw.beginPath()
    draw.lineWidth = currentWidth
}
function Drawing(event){
    if(!isDrawing)return
    draw.lineTo(event.offsetX ,event.offsetY)
    draw.strokeStyle = `${currentcolor}` 
    draw.stroke()
}
function endDraw(event){
isDrawing = false
}
canvas.addEventListener('mousedown' , startDraw)
canvas.addEventListener('mousemove' , Drawing)
canvas.addEventListener('mouseup' , endDraw)


brushWidth.addEventListener('change' , () =>{
    currentWidth = brushWidth.value
})
brushcolor.addEventListener('change' , () =>{
    currentcolor = brushcolor.value
})
brush.addEventListener('click' , () =>{
    brush.classList.add('active')
    eraser.classList.remove('active')
    choosecolor.classList.remove('active')
    currentcolor = brushcolor.value
})
eraser.addEventListener('click' , () =>{
    eraser.classList.add('active')
    brush.classList.remove('active')
    choosecolor.classList.remove('active')
    currentcolor = '#e2e1e1'
})
choosecolor.addEventListener('click' , () =>{
    choosecolor.classList.add('active')
    eraser.classList.remove('active')
    brush.classList.remove('active')
})
brushcolor.addEventListener('click' , () =>{
    choosecolor.classList.add('active')
    eraser.classList.remove('active')
    brush.classList.remove('active')
})
clearbtn.addEventListener('click' , () => {
    draw.fillStyle = "#e2e1e1"
    draw.fillRect(0,0,canvas.offsetWidth,canvas.offsetHeight)
})
savebtn.addEventListener('click' , () =>{
    let link = document.createElement('a')
    link.download = `${Date.now()}.jpg`
    link.href = canvas.toDataURL()
    link.click()


})
