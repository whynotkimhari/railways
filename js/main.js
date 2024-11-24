import { 
  show, 
  hide, 
  renderMap, 
  renderTime, 
  hideAshowB, 
  enableButton,
  disableButton,
  renderUserName, 
  stopTimeElapsing, 
  hideInfoAfterWin, 
  startTimeElapsing, 
  renderLeaderBoard,
  displayInfoAfterWin, 
  renderExampleInRules,
  renderWinningAnimation,
} from './render.js'

import { 
  init,
  isWinGame, 
  placeRail, 
  deleteRail, 
  canRematch,
  isEndGame, 
} from './logic.js'

import { 
  getRandom, 
  isGoodName, 
  saveRecord, 
  toUpperCase, 
  saveGameState, 
  deleteGameState, 
} from "./util.js"

import { 
  db, 
  divGame, 
  divMenu, 
  divLost, 
  divRules, 
  divThumbnail, 
  inputUserName,
  divLeaderBoard, 
  divConfirmation,
} from './constant.js'

// Game States
const gameState = canRematch() ? JSON.parse(localStorage?.latest) : {
  gameID: undefined,
  mode: 'EASY',
  username: '',
  table: [[]],
  checkTable: [[]],
  time: 20*60,
  timeLimit: 20*60,
  timeID: undefined,
  isFinished: false,
}

// Switching from Thumbnail to Menu
divThumbnail.addEventListener('click', () => hideAshowB(divThumbnail, divMenu))

// Username to be uppercase
inputUserName.addEventListener('input', toUpperCase)

// Switching between HARD and EASY mode
divMenu
  .querySelector('#difficulty')
  .addEventListener('click', e => {
    if (e.target.matches('button')) {
      // switching state
      if (!Array.from(e.target.classList).includes('diff-btn-clicked')) {
        divMenu
          .querySelectorAll('#difficulty button')
          .forEach(btn => btn.classList.remove('diff-btn-clicked'))
  
        e.target.classList.add('diff-btn-clicked')
  
        // Update gameState
        gameState.mode = e.target.dataset.mode
      }
    }
})

// Clicking rules/start button
divMenu
  .querySelector('#buttons')
  .addEventListener('click', e => {
    // Switching from Menu to Rules
    if (e.target.matches('button#rules-btn')) hideAshowB(divMenu, divRules)

    if (e.target.matches('button#start-btn')) {
      // Avoid multiple clicking
      disableButton(e.target)

      // Check username
      if (!isGoodName(inputUserName.value.trim())) {
        inputUserName.value = ""
        inputUserName.placeholder = `${getRandom(db.FUN.placeholder)} (MAX 8 CHARACTERS)`
        inputUserName.classList.add('buzz-shake')
        setTimeout(() => inputUserName.classList.remove('buzz-shake'), 600 + 15)
        enableButton(e.target, 600 + 15)
        return
      }

      // Create GameState
      init(gameState, inputUserName)
      renderUserName(gameState)
      renderTime(gameState, true)
      renderMap(gameState)

      // Setup time elapsing
      startTimeElapsing(gameState)
      
      // Switch to Game page
      hideAshowB(divMenu, divGame)

      enableButton(e.target, 1000 - 15)
    }
})

// Hoverings in rules tabs
divRules.addEventListener('mouseover', renderExampleInRules)

// Switching from Rules to Menu
divRules.addEventListener('click', e => e.target.matches('button') && hideAshowB(divRules, divMenu))

// Switching from Leader Board to Game
divLeaderBoard.addEventListener('click', e => {
  if (e.target.matches('button')) {
    disableButton(e.target)
    hideAshowB(divLeaderBoard, divGame)
    
    // Add 1 seconds for the animation of switching pages
    ++gameState.time
    startTimeElapsing(gameState)

    enableButton(e.target, 1000 - 15)
  }
})

// Not allow dragging the tile
divGame.addEventListener('dragstart', e => e.target.matches('table tr td img') && e.preventDefault())

divConfirmation.addEventListener('click', e => {
  // Delete game state and go back to menu
  if (e.target.matches('button.yes')) {
    disableButton(e.target)
    hide(divConfirmation)
    deleteGameState()
    hideAshowB(divGame, divMenu)
    enableButton(e.target, 1000 - 15)
  }

  // Continue playing
  else if (e.target.matches('button.no')) {
    disableButton(e.target)
    hide(divConfirmation)
    startTimeElapsing(gameState)
    enableButton(e.target, 1000 - 15)
  }
})

divLost.addEventListener('click', e => {
  hide(divLost)

  // Delete game state and go back to menu
  if (e.target.matches('button.yes')) {
    disableButton(e.target)
    deleteGameState()
    hideAshowB(divGame, divMenu)
    enableButton(e.target, 1000 - 15)
  }
})

divGame.addEventListener('click', e => {
  // Go back to the menu to choose different type
  if (e.target.matches('button#back-btn')) {
    disableButton(e.target)
    hideAshowB(divGame, divMenu)
    hideInfoAfterWin()
    enableButton(e.target, 1000 - 15)
  }

  // Leave without saving the game state
  else if (e.target.matches('button#leave-btn')) {
    disableButton(e.target)
    stopTimeElapsing(gameState)
    show(divConfirmation)
    enableButton(e.target, 1000 - 15)
  }

  // Show the leader board
  // Stop the time when viewing leader board
  else if (e.target.matches('button#leader-board-btn')) {
    disableButton(e.target)
    stopTimeElapsing(gameState)
    hideAshowB(divGame, divLeaderBoard)
    renderLeaderBoard(gameState)
    enableButton(e.target, 1000 - 15)
  }

  // Place a rail when clicking left mouse
  else if (e.target.matches('img')) {
    if (isEndGame(gameState)) return

    placeRail(e.target, gameState)
    renderMap(gameState)
    
    if (isWinGame(gameState)) {
      gameState.isFinished = true
      displayInfoAfterWin(gameState)

      stopTimeElapsing(gameState)
      saveRecord(gameState)
      renderTime(gameState, true)
      const time = renderWinningAnimation(gameState)
      
      setTimeout(() => {
        hideAshowB(divGame, divLeaderBoard)
        renderLeaderBoard(gameState)
      }, time - 15)
    }

    // save latest state
    saveGameState(gameState)
  }
})

// Delete rail on tile when clicking right mouse
divGame.querySelector('table').addEventListener('contextmenu', e => {
  e.preventDefault();

  if (isEndGame(gameState)) return
  
  if (e.target.matches('table')) {
    deleteRail(e.target, gameState)
  
    // re-render and save latest state
    renderMap(gameState) 
    saveGameState(gameState)
  }
})

// Check if there is last state that is not finished
// If yes, go for it
// Else, do nothing
if (canRematch()) {
  renderUserName(gameState)
  renderTime(gameState, true)
  renderMap(gameState)

  // Add 1 seconds for the animation of switching pages
  // Setup new time elapsing
  ++gameState.time
  startTimeElapsing(gameState)
  
  // Switch to Game page immediately
  hideAshowB(divThumbnail, divGame)
}