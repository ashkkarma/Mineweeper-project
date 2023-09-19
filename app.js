// const second = 1000,
//       minute = second * 60,
//       hour = minute * 60,
//       day = hour * 24;

// let countDown = new Date('Feb 10, 2020 00:00:00').getTime(),
//     x = setInterval(function() {    

//       let now = new Date().getTime(),
//           distance = now - countDown;

//       document.getElementById('days').innerText = Math.floor(distance / (day)),
//         document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
//         document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
//         document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

//       //do something later when date is reached
//       //if (distance < 0) {
//       //  clearInterval(x);
//       //  'IT'S MY BIRTHDAY!;
//       //}

//     }, second)

function init () {

//body layout
const width = 16
const height = 16
const cellCount = width*height
//great grid div's and index
const mineArray =[]


console.log(mineArray);
for (let i = 0 ; i < 40 ; i++){
 
let random = (Math.floor(271 * Math.random()));
if (mineArray.includes(random) === false && random > 15){
  mineArray.push(random)
}else {
  i--
}
}
//creat grid
const grid = document.querySelector('.container')
for (let i = 16 ; i < (cellCount+16) ; i ++){
  const cell = document.createElement('div')
  cell.innerText = i
  cell.setAttribute('id' , i)
  // cell.style.height = `${100 / height}`
  // cell.style.width = `${100 / width}`
  // document.querySelector('.mineBody').style.flexBasis = `${100/width}%`;

  grid.appendChild(cell)
  console.log(cell );
}

// set out the random mine map

function mineMap() {
  mineArray.map((number)=>{
    let mineCell = document.getElementById(`${number}`)
    mineCell.setAttribute("class", mineCell)
    const mineImg = document.createElement('img')
    mineImg.src = 'mine.jpg'
    mineCell.appendChild(mineImg)
  })
}
mineMap()
// function hintCounter (){
//   if (mineArray[0] !== 16){
//   for (let i = 16 ; i < 272 ; i++){
//     let hintCell = document.getElementById(`${i}`)
//     let hintCellInner = parseInt(hintCell.innerText)
//     if (mineArray.includes(hintCellInner)){
// console.log(hintCellInner);
//     }
   
//   }
    //  if (mineArray.includes(hintCellInner) === true){
    //   console.log(hintCellInner);
    //  }
//   }
// }
// hintCounter()
}
window.addEventListener('Dom', init())
