import { db, divGame, divLeaderBoard, divLost } from "./constant.js"
import { saveGameState, getTimeFormat, loadRecords } from "./util.js"

export const renderUserName = (gameState) => divGame.querySelector('#game-designer h3').innerHTML = gameState.username

export const renderTime = (gameState, onlyRender = false) => {
  divGame.querySelector('#game-time h3').innerHTML = getTimeFormat(gameState.time)

  gameState.time -= !onlyRender

  if (gameState.time < 0) {
    stopTimeElapsing(gameState)

    // TODO: CHANGE THIS
    // setTimeout(() => alert("YOU LOST!"), 0)
    show(divLost)
    document.querySelector('#back-btn').classList.remove('hidden')
    document.querySelector('#leave-btn').classList.add('hidden')
  }

  // This is not "extra" step but
  // To make sure that if the player don't do anything after starts the game
  // Then the game still be save 
  saveGameState(gameState)
}

export const stopTimeElapsing = (gameState) => clearInterval(gameState.timeID)

export const startTimeElapsing = (gameState) => {
  gameState.timeID = setInterval(
    () => (gameState.time >= 0) && renderTime(gameState), 1000
  )
}

export const renderMap = (gameState) => {
  divGame.querySelector('table').innerHTML = gameState.table.map(
    (row, i) => `<tr>
      ${row.map((tile, j) => 
      `<td>
        <img 
          data-i="${i}" 
          data-j="${j}" 
          data-type="${tile}" 
          src="${db.TILE[tile].path}" 
          alt="${db.TILE[tile].alt}"
        />
      </td>`).join('')}
    </tr>`
  ).join('')
}

const getRecordsIn = (records, mode) => {
  return records
    .filter(record => record.mode === mode)
    .sort((r1, r2) => r1.usedTime - r2.usedTime)
}

const getTextReprRecords = (records, currentGameID) => {
  return records
    .map(record => currentGameID === record.gameID ? `
      <tr>
        <td><span>${record.gameID}</span></td>
        <td><span>${record.mode}</span></td>
        <td><span>${record.username}</span></td>
        <td><span>${getTimeFormat(record.usedTime)}</span></td>
      </tr>
  ` : `
      <tr>
        <td>${record.gameID}</td>
        <td>${record.mode}</td>
        <td>${record.username}</td>
        <td>${getTimeFormat(record.usedTime)}</td>
      </tr>
  `).join('')
}

export const renderLeaderBoard = (gameState = undefined) => {
  const recs = loadRecords()
  const thead = `
    <tr>
      <th>ID</th>
      <th>Mode</th>
      <th>Name</th>
      <th>Used Time</th>
    </tr>
  `

  if (gameState) {
    const records = getRecordsIn(recs, gameState.mode)

    divLeaderBoard
    .querySelector('#leader-board-cont')
      .innerHTML = records.length === 0 
        ? 'There is no one win this level yet!' 
        : `
            <table>
              ${thead}
              ${getTextReprRecords(records, gameState.gameID)}
            </table>
          `
  }

  // Total leader board
  // But I don't where to put this in the design
  // I'm also too lazy to do, so just let this be here, uselessly :D
  else {
    const easy = getRecordsIn(recs, 'EASY')
    const hard = getRecordsIn(recs, 'HARD')

    divLeaderBoard
    .querySelector('#leader-board-cont')
      .innerHTML = easy.length === 0 && hard.length === 0
        ? 'There is no one win yet!' 
        : `
            <table>
              ${thead}
              ${getTextReprRecords(easy)}
              ${getTextReprRecords(hard)}
            </table>
          `
  }
}

export const disableButton = button => button.disabled = true
export const enableButton = (button, delay = 0) => setTimeout(() => button.disabled = false, delay)

// Switching between pages
export const hideAshowB = (pageA, pageB) => {
  pageA.classList.remove('fade-in')
  pageA.classList.add('fade-out')
  setTimeout(() => {
    pageA.classList.add('hidden')
    pageA.classList.remove('fade-out')
    pageB.classList.remove('hidden')
    pageB.classList.add('fade-in')
  }, 1000 - 15)
}

export const show = (page) => {
  page.classList.remove('hidden')
  page.classList.add('fade-in')
}

export const hide = (page) => {
  page.classList.remove('fade-in')
  page.classList.add('fade-out-no-scale')
  setTimeout(() => {
    page.classList.add('hidden')
    page.classList.remove('fade-out-no-scale')
  }, 1000 - 15)
}

export const displayInfoAfterWin = (gameState) => {
  document.querySelector('#finished-time').classList.remove('hidden')
  document.querySelector('#finished-time h3').innerHTML = getTimeFormat(gameState.timeLimit - gameState.time)
  document.querySelector('#game-time').classList.add('hidden')
  document.querySelector('#back-btn').classList.remove('hidden')
  document.querySelector('#leave-btn').classList.add('hidden')
}

export const hideInfoAfterWin = () => {
  setTimeout(() => {
    document.querySelector('#finished-time').classList.add('hidden')
    document.querySelector('#back-btn').classList.add('hidden')
    document.querySelector('#game-time').classList.remove('hidden')
    document.querySelector('#leave-btn').classList.remove('hidden')
  }, 1000 - 15)
}

export const renderExampleInRules = e => {
  if (e.target.matches('img[src="assets/empty.svg"]'))
    e.target.src = "assets/straight_rail.svg"

  else if (e.target.matches('img[src="assets/straight_rail.svg"]'))
    e.target.src = "assets/empty.svg"

  else if (e.target.matches('img[src="assets/mountain.svg"]'))
    e.target.src = "assets/mountain_rail.svg"

  else if (e.target.matches('img[src="assets/mountain_rail.svg"]'))
    e.target.src = "assets/mountain.svg"

  else if (e.target.matches('img[src="assets/bridge.svg"]'))
    e.target.src = "assets/bridge_rail.svg"

  else if (e.target.matches('img[src="assets/bridge_rail.svg"]'))
    e.target.src = "assets/bridge.svg"
}

const addBuzzShakeAnimation = (target, t1, t2) => {
  setTimeout(() => {
    target.classList.add("buzz-shake-long");
    setTimeout(() => target.classList.remove("buzz-shake-long"), t1);
  }, t2);
}

export const renderWinningAnimation = (gameState) => {
  for (let a = 1; a <= db.MAP[gameState.mode].size; a++) {
    for (let b = 1; b <= db.MAP[gameState.mode].size; b++) {
      const target = divGame.querySelector(`table tr:nth-child(${a}) td:nth-child(${b}) img`)

      addBuzzShakeAnimation(target, 2000, a * b * 100)
    }
  }

  addBuzzShakeAnimation(
    divGame.querySelector('table'), 2000, 
    db.MAP[gameState.mode].size * db.MAP[gameState.mode].size * 100)

  return (db.MAP[gameState.mode].size * db.MAP[gameState.mode].size + 1) * 100
}