
function init() {
  let startGame = document.querySelector('.imoji')
  
  const startimg = document.createElement('img')
  startimg.src = 'happy40.jpg'
startGame.appendChild(startimg)
document.querySelector('.counter').innerText = '40'
  //body layout
  const width = 16
  const height = 16
  const cellCount = width * height
  //great grid div's and index
  const mineArray = []


  // console.log(mineArray);
  for (let i = 0; i < 40; i++) {

    let random = (Math.floor(271 * Math.random()));
    if (mineArray.includes(random) === false && random > 15) {
      mineArray.push(random)
    } else {
      i--
    }
  }
  //creat grid
  const grid = document.querySelector('.container')
  for (let i = 16; i < (cellCount + 16); i++) {
    const cell = document.createElement('div')
    // cell.innerText = i

    cell.setAttribute('id', i)
    // cell.style.height = `${100 / height}`
    // cell.style.width = `${100 / width}`
    // document.querySelector('.mineBody').style.flexBasis = `${100/width}%`;

    grid.appendChild(cell)
    // console.log(cell );
  }

  // set out the random mine map

  function mineMap() {
    mineArray.map((number) => {
      let mineCell = document.getElementById(`${number}`)
      mineCell.setAttribute("class", mineCell)
      const mineImg = document.createElement('img')
      mineImg.src = 'image-40x40.jpg'
      mineCell.appendChild(mineImg)
      mineImg.style.width = '52px'
      mineImg.style.height = '40px'
      mineImg.style.visibility = 'hidden'
    })
  }
  mineMap()
  ///counter


  ///set click function
  const flagArr = []
  function logFlag() {
    console.log(flagArr);
  }
  function counter() {

    const count = document.querySelector('.counter')
    const countDis = document.createElement('div')

    countDis.innerHTML = (40 - flagArr.length)
    count.replaceChildren(countDis)
  }

  function flagSelector() {
    // let disableRight = document.querySelector('.container')
    // disableRight.addEventListener('contextmenu', (right) => {
    //   right.preventDefault();


    // })
    for (let i = 16; i < (cellCount + 16); i++) {
      let flagSelect = document.getElementById(`${i}`)
      let flagInd = parseInt(flagSelect.id)

      flagSelect.addEventListener('contextmenu', (right) => {
        right.preventDefault();
        const flagImg = document.createElement('img')
        flagImg.src = 'flag.png'
        flagSelect.replaceChildren(flagImg)
        flagImg.style.width = '55px'
        flagImg.style.height = '45px'
        flagImg.style.paddingBottom = '9px'
        flagImg.style.paddingRight = '4px'

        if (flagArr.includes(flagInd)) {
          flagImg.remove()
          flagArr.splice(flagInd, 1)
          console.log(flagArr);
          counter()
        } else {
          flagArr.push(flagInd)
          counter()
          // logFlag ()
          if (flagArr.length >= 40) {
            winGame()
          }

        }


      })
    }
  }
  flagSelector()


  //leftClickFuncs,game over function,hint function
  function leftClickFunc(num) {
    if (mineArray.includes(num)) {
      gameOver()

    }
  }

  document.querySelector('.imoji').addEventListener('click' ,()=>{
    location.reload();
  })

  document.querySelectorAll('.container div').forEach(div => {
    div.addEventListener('click', () => {
      console.log('test');
      const myId = parseInt(div.getAttribute('id'))
      leftClickFunc(myId)
      emptyReveal(myId)
    })
  })

  //game over function
  function gameOver() {
    // alert("finsh");
    
    let gameOverGrab = document.querySelector('.imoji')
    const createImg = document.createElement('img')
createImg.src = 'sad40.jpg'
startGame.replaceChildren(createImg)
    mineArray.map((number) => {
      let mineCell = document.getElementById(`${number}`)

      const mineImg = document.createElement('img')
      mineImg.src = 'image-40x40.jpg'
      mineCell.replaceChildren(mineImg)
      mineImg.style.width = '52px'
      mineImg.style.height = '40px'
      // mineImg.style.visibility = 'hidden'

    })

    // reset()
  }


  ///reset function
  function reset() { window.location.reload() }
  ///empty space func
  function emptySpace() {

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
    }
    // else {
    //   // if the pause button is clicked it will resume
    // controlButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    // clearInterval(interval);
    // }
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

  function hint() {

    for (let i = 16; i < (cellCount + 16); i++) {


      const hintInd = document.getElementById(`${i}`)
      let num = parseInt(hintInd.id)
      hintInd.addEventListener('click', () => {

        let hintArrLength = parseInt(lengthCal(num))
        //  console.log(hintArrLength);
        if (hintArrLength > 0) {
          const hintCellGet = document.getElementById(`${i}`)
          let hintCellCreate = document.createElement('p')
          hintCellCreate.innerHTML = `${hintArrLength}`
          hintCellGet.replaceChildren(hintCellCreate)
          hintCellGet.setAttribute("id", "hint")

          // console.log(hintAr 
        }

      })
    }

  }
  hint()
  // winning function

  function winGame() {


    let result = areEqual(flagArr, mineArray)
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
    console.log(result)
    if (result === true) {
      const winnText = document.querySelector('.container')
      const winTextImg = document.createElement('img')
      winTextImg.src = 'winner.jpg'
      winnText.replaceChildren(winTextImg)
    }

  }


  let newHintAryy = []

  function lengthCal(num) {
    newHintAryy.splice(0, newHintAryy.length)
    if (mineArray.includes(num) === false) {
      if ((num % 16 !== 0) && (num % 16 !== 15)) {
        if (mineArray.includes(num - 1) === true) {
          newHintAryy.push(num - 1)
        }
        if (mineArray.includes(num - 15) === true) {
          newHintAryy.push(num - 15)
        }
        if (mineArray.includes(num - 16) === true) {
          newHintAryy.push(num - 16)
        }
        if (mineArray.includes(num - 17) === true) {
          newHintAryy.push(num - 17)
        }
        if (mineArray.includes(num + 1) === true) {
          newHintAryy.push(num + 1)
        }
        if (mineArray.includes(num + 15) === true) {
          newHintAryy.push(num + 15)
        }
        if (mineArray.includes(num + 16) === true) {
          newHintAryy.push(num + 16)
        }
        if (mineArray.includes(num + 17) === true) {
          newHintAryy.push(num + 17)
        }
        return ((newHintAryy.length));;
      } else if ((num % 16 === 0)) {
        if (mineArray.includes(num - 15) === true) {
          newHintAryy.push(num - 15)
        }
        if (mineArray.includes(num - 16) === true) {
          newHintAryy.push(num - 16)
        }
        if (mineArray.includes(num + 1) === true) {
          newHintAryy.push(num + 1)
        }
        if (mineArray.includes(num + 16) === true) {
          newHintAryy.push(num + 16)
        }
        if (mineArray.includes(num + 17) === true) {
          newHintAryy.push(num + 17)
        }

        return (newHintAryy.length);

      } else if ((num % 16 === 15)) {
        if (mineArray.includes(num - 17) === true) {
          newHintAryy.push(num - 17)
        }
        if (mineArray.includes(num - 16) === true) {
          newHintAryy.push(num - 16)
        }
        if (mineArray.includes(num - 1) === true) {
          newHintAryy.push(num - 1)
        }
        if (mineArray.includes(num + 16) === true) {
          newHintAryy.push(num + 16)
        }
        if (mineArray.includes(num + 15) === true) {
          newHintAryy.push(num + 15)
        }
        return (newHintAryy.length);
      }
    }
  }
  ///empty and hint numbers arry
  let mapArr = []
  for (let i = 16; i < 273; i++) {
    mapArr.push(i)
  }
  // console.log(mapArr);
  const hintEmptyArray = mapArr.filter((allCells) => {
    if (mineArray.includes(allCells) === false) {
      return allCells
    }

  })
  // console.log(hintEmptyArray);

  // /lenghtcal map

  let lengthArry = hintEmptyArray.map((x) => {
    const lenghtCell = lengthCal(x)
    return lenghtCell
  })
  // console.log (lengthArry)


  ///empty cells finter

  const emptyCells = lengthArry.filter((x) => {
    return x < 1
  })
  // console.log(emptyCells);
  ///
  const emptyArry = []
  mapArr.filter((x) => {
    if (lengthCal(x) < 1) {
      emptyArry.push(x)
    }
  })
  console.log(emptyArry);
  function emptyReveal(num) {
    if (emptyArry.includes(num)) {
      const arrayAround = [num, num + width, num - width, num - 1, num + 1, num + (width - 1), num + (width + 1), num - (width - 1), num - (width + 1)]
      console.log(arrayAround);



      arrayAround.forEach(element => {
        const myElement = document.getElementById(element)
        if (emptyArry.includes(element) && !mineArray.includes(element) && !myElement.classList.contains('revealed')) {
          myElement.style.backgroundColor = 'HoneyDew'
          myElement.classList.add('revealed')
          emptyReveal(element)

        }
        // if (hintArr.includes(element)) {
        //   let hintArrLength = parseInt(lengthCal(num))
        //   //  console.log(hintArrLength);
        //   if (hintArrLength > 0) {
        //     const hintCellGet = document.getElementById(element)
        //     let hintCellCreate = document.createElement('p')
        //     hintCellCreate.innerHTML = `${hintArrLength}`
        //     hintCellGet.replaceChildren(hintCellCreate)
        //     hintCellGet.setAttribute("class", "hint")
        //   }
        // }
      });

    }
    return
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

