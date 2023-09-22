function init(){

  // ! Elements
  const clearEl = document.querySelector('#clear')
  const timerEl = document.querySelector('#timer')
  timerEl.innerText = '00:00'
  const minesEl = document.querySelector('#mines-remaining')
  const selectedLevelEl = document.querySelector('#selected-level')


  // ! Variables
  // Level setup
  const levels = {
    1: {
      mines: 10,
      height: 9,
      width: 9
    },
    2: {
      mines: 40,
      height: 15,
      width: 15
    },
    3: {
      mines: 99,
      height: 16,
      width: 30
    }
  }
  let selectedLevel = window.localStorage.getItem('minesweeper_level') ? parseInt(window.localStorage.getItem('minesweeper_level')) : 1
  selectedLevelEl.value = selectedLevel
  let cellCount

  // Mines setup
  let minesRemaining = levels[selectedLevel].mines
  minesEl.innerText = minesRemaining
  let currentMinePositions

  // Timer
  let timer
  let mins = 0
  let secs = 0

  // Active variables
  let isRunning = false
  let gameOver = false



  // ! Execution
  function startGame(e){
    // This function starts & restarts the game

    if(!gameOver && !isRunning){
      // ? set isRunning to true
      isRunning = true

      // ? place mines
      placeMines()

      // ? Start new timer
      timer = setInterval(() => {
        secs += 1
        if(secs >= 60){
          secs = 0
          mins += 1
        }
        timerEl.innerText = `${mins >= 10 ? mins : '0' + mins}:${secs >= 10 ? secs : '0' + secs}`
      }, 1000)
    }
    
  }

  // Ends current game
  function endGame(){
    isRunning = false
    clearInterval(timer)
  }

  // Resets all variables when executed
  function resetVariables(){
    // ? end old game if still running
    endGame()

    // ? reset checked array
    checked = []

    // ? set gameOver to false so game can restart
    gameOver = false

    // ? Reset timer
    timerEl.innerText = '00:00'
    secs = 0
    mins = 0

    // ? reset cells
    cells.forEach(cell => {
      cell.classList = ''
      cell.innerText = ''
    })

    // ? Reset mines span
    minesEl.innerText = levels[selectedLevel].mines

    // ? Reset emoji
    clearEl.innerHTML = '🙂'
  }

  // Randomly place mines
  function placeMines(){
    // Array of indexes to place mines
    const minePositions = []
    for(let i = 0; i < levels[selectedLevel].mines; i++){
      // While loop to ensure there aren't 2 of the same index in the minePositions array
      while(minePositions.length === i){
        const random = Math.floor(Math.random() * cellCount)
        if(!minePositions.includes(random)){
          minePositions.push(random)
        }
      }
    }
    // Place mines on each of the random cells generated
    minePositions.forEach(p => cells[p].classList.add('mine'))

    // Set minePositions to currentMinePositions
    currentMinePositions = minePositions
  }

  // The main click function
  function checkForMine(e){
    if(!gameOver){
      // Cell clicked
      const t = e.target
      // Start game if not already started
      if(!isRunning){
        startGame()
      }

      // Check for mine
      if(t.classList.contains('mine')){
        showMines(t)
        endGame()
        gameOver = true
      } else {
        fill(t)
      }

      checkForWin()
    }
  }


  // Checked array in global scope
  let checked = []

  function fill(cell, bubble = true){
    if(!checked.includes(cell.dataset.index) && !cell.classList.contains('mine')){
      const neighbours = validNeighbours(cell)

      // Add numbers to checked
      checked.push(cell.dataset.index)
      
      // get num of surrounding mines
      const surroundingMines = neighbours.reduce((acc, s) => {
        return cells[s].classList.contains('mine') ? acc + 1 : acc
      }, 0)
      
      // Update clicked
      const numberClasses = ['zero', 'one', 'two', 'three', 'four', 'five', 'six']
      cell.innerText = surroundingMines ? surroundingMines : ''
      cell.classList.add(numberClasses[surroundingMines], 'non-mine')

      if(bubble){
        // Check for surrounding empty cells
        const empty = neighbours.filter(s => !neighbourMineCheck(cells[s]) && !cells[s].classList.contains('mine'))
        console.log(empty.map(e => cells[e]))

        // Bubble or not
        neighbours.forEach(n => {
          if(!checked.includes(n) && empty.length){
            !empty.includes(n) ? fill(cells[n], false) : fill(cells[n])
          }
        })
      }
    }
  }

  // return all valid neighbour cells
  function validNeighbours(cell){
    const i = parseInt(cell.dataset.index)
    const col = parseInt(cell.dataset.column)
    const w = levels[selectedLevel].width
    let spread = [i - w - 1, i - w, i - w + 1, i - 1, i + 1, i + w - 1, i + w, i + w + 1]
    
    // Remove invalid indexes from spread
    spread = spread.filter(s => s < cellCount && s >= 0)
    
    // Check if bordering left or right, remove relevant indexes from spread if so
    if(col === 0) spread = spread.filter(p => parseInt(cells[p].dataset.column) !== w - 1) // Remove left side if bordering left
    if(col === levels[selectedLevel].width - 1) spread = spread.filter(p => parseInt(cells[p].dataset.column) !== 0) // Remove right side if bordering right

    return spread
  }

  // check neighbours for mines
  function neighbourMineCheck(cell){
    const neighbours = validNeighbours(cell)
    return neighbours.reduce((acc, s) => {
      return cells[s].classList.contains('mine') ? acc + 1 : acc
    }, 0)
  }

  // Check for win
  function checkForWin(){
    const remaining = cells.filter(cell => !cell.classList.contains('non-mine') && !cell.classList.contains('mine'))
    if(!remaining.length){
      winGame()
    }
  }

  // Win function
  function winGame(){
    // ? End game
    endGame()

    // ? Reset emoji
    clearEl.innerHTML = '😎'
    
    // ? alert win
    setTimeout(() => window.alert('You win!'), 200)
  }

  // When a mine has been hit, show that mine as hit & all other undetected mines
  function showMines(hit){
    clearEl.innerHTML = '😵'
    hit.classList.add('hit')
    const mines = document.querySelectorAll('.mine')
    mines.forEach(mine => !mine.classList.contains('hit') && mine.classList.add('show'))
  }

  // When user changes level, handle variables and grid
  function changeLevel(e){
    selectedLevel = e.target ? parseInt(e.target.value) : e
    window.localStorage.setItem('minesweeper_level', selectedLevel)
    grid.dataset.level = e.target ? e.target.value : e
    createGrid()
  }


  // ! Events
  clearEl.addEventListener('click', resetVariables)
  selectedLevelEl.addEventListener('change', changeLevel)


  // ! Setup

  // Create Grid
  const grid = document.querySelector('#grid')
  let cells = []

  function createGrid(){
    if(isRunning || gameOver){
      resetVariables()
    }
    grid.innerHTML = ''
    cells = []
    cellCount = levels[selectedLevel].width * levels[selectedLevel].height
    for(let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.dataset.index = i
      cell.dataset.column = i % levels[selectedLevel].width
      cell.dataset.row = Math.floor(i / levels[selectedLevel].width)
      grid.appendChild(cell)
      cells.push(cell)
      cell.addEventListener('click', checkForMine)
    }
  }

  changeLevel(selectedLevel)


}

window.addEventListener('DOMContentLoaded', init)