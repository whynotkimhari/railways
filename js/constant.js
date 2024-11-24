// Selectors
export const divGame = document.querySelector('#game')
export const divMenu = document.querySelector('#menu')
export const divLost = document.querySelector('#lost')
export const divRules = document.querySelector('#rules')
export const divThumbnail = document.querySelector('#thumbnail')
export const divLeaderBoard = document.querySelector('#leader-board')
export const divConfirmation = document.querySelector('#confirmation')
export const inputUserName = document.querySelector('#menu-input input')

// Database
export const db = {
  MAP: {
    DEV: {
      initPoint: [0, 0], // i = 0, j = 0
      size: 2,
      table: [
        [
          [0, 0],
          [0, 0],
        ]
      ],
    },
    EASY: {
      initPoint: [1, 2], // i = 1, j = 2
      size: 5,
      table: [
        // level_e1
        [
          [0, 2, 0, 0, 7],
          [0, 0, 0, 6, 7],
          [6, 0, 3, 0, 0],
          [0, 0, 0, 7, 0],
          [0, 0, 4, 0, 0]
        ],
        // level_e2
        [
          [7, 0, 5, 0, 0],
          [0, 3, 0, 0, 3],
          [6, 7, 4, 0, 0],
          [0, 0, 0, 7, 0],
          [0, 0, 0, 0, 0]
        ],
        // level_e3
        [
          [0, 0, 5, 0, 0],
          [0, 0, 0, 0, 6],
          [0, 3, 6, 0, 0],
          [0, 7, 0, 0, 0],
          [0, 5, 0, 0, 3]
        ],
        // level_e4
        [
          [0, 0, 0, 5, 0],
          [0, 0, 0, 0, 0],
          [6, 0, 2, 0, 2],
          [0, 0, 0, 0, 0],
          [0, 0, 7, 4, 0]
        ],
        // level_e5
        [
          [0, 0, 5, 0, 0],
          [0, 1, 0, 0, 0],
          [6, 0, 0, 4, 0],
          [0, 0, 6, 7, 0],
          [0, 3, 0, 0, 0]
        ],
      ]
    },
    HARD: {
      initPoint: [0, 0], // i = 0, j = 0
      size: 7,
      table: [
        // level_d1
        [
          [0, 2, 7, 7, 0, 5, 0],
          [6, 0, 0, 0, 0, 0, 0],
          [0, 0, 6, 0, 0, 0, 0],
          [0, 0, 0, 4, 0, 0, 0],
          [4, 0, 2, 0, 5, 0, 7],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 5, 0, 0, 0]
        ],
        // level_d2
        [
          [0, 0, 7, 0, 0, 0, 0],
          [6, 0, 5, 0, 0, 3, 0],
          [0, 0, 5, 0, 0, 0, 6],
          [1, 0, 0, 0, 0, 0, 0],
          [0, 7, 0, 2, 0, 0, 0],
          [0, 1, 0, 0, 0, 0, 0],
          [0, 0, 7, 0, 0, 0, 0]
        ],
        // level_d3
        [
          [0, 0, 5, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 6],
          [7, 0, 4, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 7, 4, 0, 5, 0, 0],
          [6, 0, 0, 0, 0, 2, 0],
          [0, 0, 7, 4, 0, 0, 0]
        ],
        // level_d4
        [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 6, 0, 3, 0],
          [0, 0, 4, 0, 0, 0, 0],
          [0, 5, 0, 7, 0, 5, 0],
          [0, 0, 3, 0, 2, 0, 0],
          [6, 0, 0, 0, 0, 4, 0],
          [0, 0, 0, 0, 0, 0, 0]
        ],
        // level_d5
        [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 1, 0],
          [0, 5, 5, 0, 2, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 1, 0, 7, 0, 0],
          [0, 3, 0, 6, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0]
        ],
      ]
    }
  },
  TILE: [                                                                 // id
    // normal
    { path: "assets/empty.svg", alt: "Empty tile" },                      // 0
  
    { path: "assets/mountain.svg", alt: "Mountain tile" },                // 1
    { path: "assets/mountain-sw.svg", alt: "Mountain tile" },             // 2
    { path: "assets/mountain-nw.svg", alt: "Mountain tile" },             // 3
    { path: "assets/mountain-ne.svg", alt: "Mountain tile" },             // 4
  
    { path: "assets/bridge-ew.svg", alt: "Bridge tile" },                 // 5
    { path: "assets/bridge.svg", alt: "Bridge tile" },                    // 6
    
    { path: "assets/oasis.svg", alt: "Oasis tile" },                      // 7

    // rails
    { path: "assets/straight_rail.svg", alt: "Rail tile" },               // 8
    { path: "assets/straight_rail-ew.svg", alt: "Rail tile" },            // 9
    { path: "assets/curve_rail.svg", alt: "Curve rail tile" },            // 10
    { path: "assets/curve_rail-sw.svg", alt: "Curve rail tile" },         // 11
    { path: "assets/curve_rail-nw.svg", alt: "Curve rail tile" },         // 12
    { path: "assets/curve_rail-ne.svg", alt: "Curve rail tile" },         // 13
  
    { path: "assets/mountain_rail.svg", alt: "Mountain rail tile" },      // 14
    { path: "assets/mountain_rail-sw.svg", alt: "Mountain rail tile" },   // 15
    { path: "assets/mountain_rail-nw.svg", alt: "Mountain rail tile" },   // 16
    { path: "assets/mountain_rail-ne.svg", alt: "Mountain rail tile" },   // 17
  
    { path: "assets/bridge_rail-ew.svg", alt: "Bridge rail tile" },       // 18
    { path: "assets/bridge_rail.svg", alt: "Bridge rail tile" },          // 19
  ],
  FUN: {
    placeholder: ["WHO ARE YOU?", "PLEASE YOUR NAME!", "I ASK FOR YOUR NAME!!!", "AT LEAST YOUR NAME!", "YOUR NAMEEEE!"]
  },
  NEIGHBORS: {
    north: [8, 19, 10, 14, 11, 15],
    south: [8, 19, 12, 16, 13, 17],
    east: [9, 18, 11, 15, 12, 16],
    west: [9, 18, 10, 14, 13, 17]
  }
}