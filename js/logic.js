import { db } from "./constant.js"
import { getRandom, shallowCopy2DArray } from "./util.js"

// Check if the neighbor of the tile is a valid neighbor
const isGoodNeighbor = (homelander, neighbor, gameState) => {
  const [i, j] = homelander
  const [x, y] = neighbor

  if (x < i && !db.NEIGHBORS.north.includes(gameState.table?.[x]?.[y])) return false
  else if (x > i && !db.NEIGHBORS.south.includes(gameState.table?.[x]?.[y])) return false
  else if (y < j && !db.NEIGHBORS.west.includes(gameState.table?.[x]?.[y])) return false
  else if (y > j && !db.NEIGHBORS.east.includes(gameState.table?.[x]?.[y])) return false
  else return true
}

// Get the two head neighbors of the current tile
export const getNeighbors = (gameState, i, j) => {
  switch (gameState.table[i][j]) {
    case 8:                         // Straight rail North South
    case 19:
      return [i - 1, j, i + 1, j]
    
    case 9:                         // Straight rail East West
    case 18:
      return [i, j - 1, i, j + 1]

    case 10:                        // Curve rail South East
    case 14:
      return [i + 1, j, i, j + 1]

    case 11:                        // Curve rail South West
    case 15:
      return [i + 1, j, i, j - 1]

    case 12:                        // Curve rail North West
    case 16:
      return [i - 1, j, i, j - 1]
    
    case 13:                        // Curve rail North East
    case 17:
      return [i - 1, j, i, j + 1]

    default: break
  }
}

export const isEndGame = (gameState) => gameState.time < 0 || gameState.isFinished

export const isWinGame = (gameState) => {
  if (gameState.checkTable.every(row => row.every(tile => tile === 1))) {
    const queue = []
    const visited = []
    let [i, j] = db.MAP[gameState.mode].initPoint
    queue.push([i, j])

    while (queue.length != 0) {
      [i, j] = queue.shift()

      // convert to 1D to use .includes later
      visited.push(i * db.MAP[gameState.mode].size + j)

      const [x1, y1, x2, y2] = getNeighbors(gameState, i, j)

      if (!isGoodNeighbor([i, j], [x1, y1], gameState) || !isGoodNeighbor([i, j], [x2, y2], gameState))
        return false
        
      // If the neighbors are not visited, add them to queue
      !visited.includes(x1 * db.MAP[gameState.mode].size + y1) && queue.push([x1, y1])
      !visited.includes(x2 * db.MAP[gameState.mode].size + y2) && queue.push([x2, y2])
    }

    return true

  }

  return false
}

const getInfoTile = tileElement => [
  parseInt(tileElement.dataset.type), 
  parseInt(tileElement.dataset.i), 
  parseInt(tileElement.dataset.j)
]

export const placeRail = (tileElement, gameState) => {
  const [type, i, j] = getInfoTile(tileElement)

  gameState.checkTable[i][j] = 1

  // Empty cell
  if (type === 0)
    gameState.table[i][j] = 8

  else if (1 <= type && type <= 6)
    gameState.table[i][j] = type + 13

  else if (8 <= type && type <= 13)
    gameState.table[i][j] = (type + 1) % (13 + 1) || 8
}

export const deleteRail = (tileElement, gameState) => {
  const [type, i, j] = getInfoTile(tileElement)

  // free cell rails [8..13], others rail [14..19]
  if (8 <= type && type <= 19) {
    gameState.checkTable[i][j] = 0
    gameState.table[i][j] = ReLU(type - 13)
  }
}

// Check if last game is not finished
export const canRematch = () => {
  if (localStorage?.latest)
    return !isEndGame(JSON.parse(localStorage.latest)) 

  return false
}

// Init game state with username
export const init = (gameState, inputUserName) => {
  gameState.gameID = new Date().valueOf()
  // gameState.mode = gameState.mode
  gameState.username = inputUserName.value
  gameState.table = shallowCopy2DArray(getRandom(db.MAP[gameState.mode].table))
  gameState.checkTable = gameState.table.map(row => row.map(tile => +(tile === 7)))
  gameState.time = 20*60
  gameState.timeLimit = 20*60
  gameState.isFinished = false
  gameState.timeID = undefined
}