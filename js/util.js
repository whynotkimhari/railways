// Get random number in range (a, b) included endpoints
const random = (a, b) => Math.round(Math.random() * (b - a)) + a

// Copy by value of the 2D array
export const shallowCopy2DArray = arr => arr.map(row => [...row]);

// Get random element from an array
export const getRandom = arr => arr[random(0, arr.length - 1)]

// Get the Time format MM:SS
export const getTimeFormat = sec => `${Math.trunc(sec / 60)}:${Math.trunc(sec % 60).toString().padStart(2, '0')}`

// Check if the name is good
// A good name is not empty and the maximum length is 8
export const isGoodName = str => 0 < str.length && str.length <= 8

// Save winner record
// This function is only called when the player is win the current game
export const saveRecord = gameState => {
  const lbObject = loadRecords()

  lbObject.push({
    username: gameState.username,
    gameID: gameState.gameID,
    mode: gameState.mode, 
    usedTime: gameState.timeLimit - gameState.time
  })

  localStorage.setItem(
    "records", 
    JSON.stringify(lbObject)
  )
}

export const loadRecords = () => JSON.parse(localStorage.getItem('records')) || []

export const deleteGameState = () => localStorage.removeItem("latest")

// Save latest game state
// This function is called usually: each 1 second and when user add/delete rail
export const saveGameState = gameState => {
  localStorage.setItem(
    "latest", 
    JSON.stringify(gameState)
  )
}

// I just borrow the name of this logic from Machine Learning class, nothing special here!
export const ReLU = x => x >= 0 ? x : 0

export const toUpperCase = (e) => e.target.value = e.target.value.toUpperCase()