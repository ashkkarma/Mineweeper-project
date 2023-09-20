
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
    mineImg.src = 'image-40x40.jpg'
    mineCell.appendChild(mineImg)
  })
}
mineMap()
///counter


///set click function
const flagArr = []
function logFlag (){
  console.log(flagArr);
}
function counter (){
  
  const count = document.querySelector('.mineCtr')
  const countDis = document.createElement('div')
  countDis.innerHTML = (40-flagArr.length)
count.appendChild(countDis)
}

function flagSelector (){
  let disableRight = document.querySelector('.container')
  disableRight.addEventListener('contextmenu',(right)=>{
    right.preventDefault();
    
    counter()
  } )
for (let i = 16 ; i < (cellCount+16) ; i ++){
  let flagSelect = document.getElementById(`${i}`)
  let flagInd = parseInt(flagSelect.id)

  flagSelect.addEventListener('contextmenu',(right)=>{
  right.preventDefault();
  const flagImg = document.createElement('img')
  flagImg.src = 'flag.png'
  flagSelect.appendChild(flagImg)
  if (flagArr.includes(flagInd)){
  flagImg.remove()
    flagArr.splice(flagInd,0)
  }else{flagArr.push(flagInd)
    // logFlag ()
    winGame()}
  
  
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
///timer 
const watchTime = document.getElementById("time");

const controlButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");

let runTime = false;
let elapsedTime = 0;
let startTime;
let interval;

/* adjust the numbers in seconds, minutes and hours */
function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000); // 1000 per seconds
  // const hours = Math.floor(totalSeconds / 3600); // seconds after hours
  const minutes = Math.floor((totalSeconds % 3600) / 60); // 60 minutes to hours
  const seconds = totalSeconds % 60; // 60 second to minutes

  return `${minutes.toString().padStart(2, "0")}:
  ${seconds.toString().padStart(2, "0")}`;
}

/* function for adding the current native time */
const realtime = () => {
  const currentTime = Date.now();
  elapsedTime += currentTime - startTime; // to increase the number over time
  startTime = currentTime;
  watchTime.innerHTML = formatTime(elapsedTime);
};

/* Start & Pause button */
document.querySelector('.container').addEventListener("click", () => {
  if (!runTime) {
    // if start button is clicked it will stop
    controlButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    if (!startTime) {
      // if the start button is clicked
      startTime = Date.now();
    }
    interval = setInterval(realtime, 10);
  } else {
    // if the pause button is clicked it will resume
    controlButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    clearInterval(interval);
  }
  runTime = !runTime;
});

/* Reset buton */
// resetButton.addEventListener("click", () => {
//   controlButton.innerHTML = '<i class="fa-solid fa-play"></i>'; // if the reset button is clicked it will return to the start button
//   clearInterval(interval); // return default time
//   runTime = false; // fixed time still running after pause
//   startTime = null; // this too
//   elapsedTime = 0; // default elapsed time
//   watchTime.innerHTML = formatTime(elapsedTime);
// });
// emptySpace ()

//hint map func
const hintArr = []

function hint (){
  
  for (let i = 16 ; i < (cellCount+16) ; i ++){
    
    
    const hintInd = document.getElementById(`${i}`)
    let num = parseInt(hintInd.id)
    hintInd.addEventListener('click', ()=>{
    if (mineArray.includes(num) === false ){
      hintArr.splice(0,hintArr.length)
      
      if(( num % 16 !== 0) && (num % 16 !== 15)){
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
      
       if (hintArr.length>0)
      {
        const hintCellGet = document.getElementById(`${i}`)
        let hintCellCreate = document.createElement('p')
        hintCellCreate.innerHTML = `${hintArr.length}`
        hintCellGet.replaceChildren(hintCellCreate)
        // console.log(hintArr);
       
        }
        //  if (hintArr.length < 1){
        
        //     // for (let i = 16 ; i < (cellCount+16) ; i ++){
        //       const emptyGet = document.getElementById(`${i}`)
        //       const nextCell = parseInt(lengthCal(i))

        //       //  console.log('hiii');
        //       if (nextCell < 1){console.log('hiii');}
              
            
          
        //   // }
        
        // }
       
    } else if (( num % 16 === 0)){
      if(mineArray.includes(num - 15) === true){
        hintArr.push(num-15)
      }
      if(mineArray.includes(num - 16) === true){
        hintArr.push(num-16)
      }
      if(mineArray.includes(num + 1) === true){
        hintArr.push(num+1)
      }
      if(mineArray.includes(num + 16) === true){
        hintArr.push(num+16)
      }
      if(mineArray.includes(num + 17) === true){
        hintArr.push(num+17)
      }
      if (hintArr.length>0){
      const hintCellGet = document.getElementById(`${i}`)
      let hintCellCreate = document.createElement('span')
      hintCellCreate.innerHTML = `${hintArr.length}`
      hintCellGet.replaceChildren(hintCellCreate)
      }
    }else if (( num % 16 === 15)){
      if(mineArray.includes(num - 17) === true){
        hintArr.push(num-17)
      }
      if(mineArray.includes(num - 16) === true){
        hintArr.push(num-16)
      }
      if(mineArray.includes(num - 1) === true){
        hintArr.push(num-1)
      }
      if(mineArray.includes(num + 16) === true){
        hintArr.push(num+16)
      }
      if(mineArray.includes(num + 15) === true){
        hintArr.push(num+15)
      }
      if (hintArr.length>0){
        const hintCellGet = document.getElementById(`${i}`)
        let hintCellCreate = document.createElement('span')
        hintCellCreate.innerHTML = `${hintArr.length}`
        hintCellGet.replaceChildren(hintCellCreate)
        }
    } 
  }

})
  }
 
}
hint()
// winning function

function winGame () {

  if (flagArr.length>=40){
    // const arr1 = ['c', 'b', 'a'];
// const arr2 = ['a', 'b', 'c'];

function areEqual(array1, array2) {
  if (array1.length === array2.length) {
    return array1.every(element => {
      if (array2.includes(element)) {
        return true;
      }

      return false;
    });
  }

  return false;
}

console.log(areEqual(flagArr, mineArray)) 
  }

}


//empty spaces function





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

let newHintAryy = []

function lengthCal (ind){
  const indLength = document.getElementById(`${ind}`)
  let num = parseInt(indLength.id)
  if (mineArray.includes(num) === false){
    if(( num % 16 !== 0) && (num % 16 !== 15)){
      if(mineArray.includes(num - 1) === true){
        newHintAryy.push(num-1)
      }
      if(mineArray.includes(num - 15) === true){
        newHintAryy.push(num-15)
      }
      if(mineArray.includes(num - 16) === true){
        newHintAryy.push(num-16)
      }
      if(mineArray.includes(num - 17) === true){
        newHintAryy.push(num-17)
      }
      if(mineArray.includes(num + 1) === true){
        newHintAryy.push(num+1)
      }
      if(mineArray.includes(num + 15) === true){
        newHintAryy.push(num+15)
      }
      if(mineArray.includes(num + 16) === true){
        newHintAryy.push(num+16)
      }
      if(mineArray.includes(num + 17) === true){
        newHintAryy.push(num+17)
      } 
      {
        
        
        return(newHintAryy.length);
       
        }
  }else if (( num % 16 === 0)){
    if(mineArray.includes(num - 15) === true){
      newHintAryy.push(num-15)
    }
    if(mineArray.includes(num - 16) === true){
      newHintAryy.push(num-16)
    }
    if(mineArray.includes(num + 1) === true){
      newHintAryy.push(num+1)
    }
    if(mineArray.includes(num + 16) === true){
      newHintAryy.push(num+16)
    }
    if(mineArray.includes(num + 17) === true){
      newHintAryy.push(num+17)
    }
    {
      return(newHintAryy);
    }
  }else if (( num % 16 === 15)){
    if(mineArray.includes(num - 17) === true){
      newHintAryy.push(num-17)
    }
    if(mineArray.includes(num - 16) === true){
      newHintAryy.push(num-16)
    }
    if(mineArray.includes(num - 1) === true){
      newHintAryy.push(num-1)
    }
    if(mineArray.includes(num + 16) === true){
      newHintAryy.push(num+16)
    }
    if(mineArray.includes(num + 15) === true){
      newHintAryy.push(num+15)
    }
    return(newHintAryy);
  } 
}
}
emptyReveal()
function emptyReveal(){
  
for (let i = 16 ; i < (cellCount+16) ; i ++){
const emptyGet = document.getElementById(`${i}`)
const num = parseInt(emptyGet)
emptyGet.addEventListener('click', () =>{
  if (mineArray.includes(num)=== false&& lengthCal(i)<1 ){
    console.log('heyyyyy');
  }
})
}
}
}
window.addEventListener('Dom', init())


// else if (mineArray.includes(num) === false &&( num % 16 === 0) && (num % 16 === 15) ){
    //   const hintArr = []
    //   if(mineArray.includes(num + 1) === true){
    //     hintArr.push(num+1)}
    //     if(mineArray.includes(num + 16) === true){
    //       hintArr.push(num+16)
    //     }
    //     if(mineArray.includes(num + 17) === true){
    //       hintArr.push(num+17)
    //     }  if(mineArray.includes(num - 15) === true){
    //       hintArr.push(num-15)
    //     }
    //     if(mineArray.includes(num - 16) === true){
    //       hintArr.push(num-16)
    //     }console.log(hintArr);
    // }

   