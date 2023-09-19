
function init () {

//body layout
const width = 16
const height = 16
const cellCount = width*height
//great grid div's and index
const mineArray =[]


// console.log(mineArray);
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
  // console.log(cell );
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

///set click function

function flagSelector (){
  let disableRight = document.querySelector('.container')
  disableRight.addEventListener('contextmenu',(right)=>{
    right.preventDefault();

  } )
for (let i = 16 ; i < (cellCount+16) ; i ++){
  let flagSelect = document.getElementById(`${i}`)
  flagSelect.addEventListener('contextmenu',(right)=>{
  right.preventDefault();
  const flagImg = document.createElement('img')
  flagImg.src = 'flag.png'
  flagSelect.appendChild(flagImg)
})
}
}
flagSelector()


//leftClickFuncs,game over function,hint function
function leftClickFunc (){
  for (let i = 16 ; i < (cellCount+16) ; i ++){
    const leftClick = document.getElementById(`${i}`)
    let num = parseInt(leftClick.innerText)
    leftClick.addEventListener('click', ()=>{
      if (mineArray.includes(num) === true){
  gameOver()
      }
    })
  }
    }
leftClickFunc()

//game over function
function gameOver(){alert("finsh");reset()}
 
        
///reset function
function reset(){window.location.reload()}
///empty space func
function emptySpace (){
  
}
// emptySpace ()

//hint map func

function hint (){
  for (let i = 16 ; i < (cellCount+16) ; i ++){
    const hintInd = document.getElementById(`${i}`)
    let num = parseInt(hintInd.innerText)
    hintInd.addEventListener('click', ()=>{
    if (mineArray.includes(num) === false){
      const hintArr = []
      if(mineArray.includes(num - 1) === true){
        hintArr.push(num-1)
      }
      if(mineArray.includes(num - 15) === true){
        hintArr.push(num-15)
      }
      if(mineArray.includes(num - 16) === true){
        hintArr.push(num-16)
      }
      if(mineArray.includes(num - 17) === true){
        hintArr.push(num-17)
      }
      if(mineArray.includes(num + 1) === true){
        hintArr.push(num+1)
      }
      if(mineArray.includes(num + 15) === true){
        hintArr.push(num+15)
      }
      if(mineArray.includes(num + 16) === true){
        hintArr.push(num+16)
      }
      if(mineArray.includes(num + 17) === true){
        hintArr.push(num+17)
      }
      console.log(hintArr);
    }
    
})
  }
 
}
hint()
/// winning function

function winGame () {
  
}
// winGame ()





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
