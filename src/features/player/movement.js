import store from '../../config/store'
import {SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT} from '../../config/constants'

export default function handleMovement(player) {

  function getNewPosition(oldPos, direction) {
    switch(direction){
      case 'WEST':
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]]
      case 'EAST':
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]]
      case 'NORTH':
        return [oldPos[0], oldPos[1] - SPRITE_SIZE]
      case 'SOUTH':
        return [oldPos[0], oldPos[1] + SPRITE_SIZE]
      default:
        return [0, 0]
    }
  }

  function getSpriteLocation(direction, walkIndex) {
    switch(direction) {
      case 'SOUTH':
        return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*0}px`
      case 'EAST':
        return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*1}px`
      case 'WEST':
        return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*2}px`
      case 'NORTH':
        return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*3}px`
      default:
        return "0px 0px"
    }
  }

  function obeserveBoundaries(oldPos, newPos) {
    return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
           (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE) 
  } 

  function obeserveImpassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles
    const y = newPos[1] / SPRITE_SIZE
    const x = newPos[0] / SPRITE_SIZE
    const nextTile = tiles[y][x]

    if(nextTile === 4) {
      tiles[y][x] = 0
      store.dispatch({
      type: 'ADD_TILES',
      payload: {
        tiles: tiles
        }
      })
      store.dispatch({
        type: 'GAME_WIN'
      })
      store.dispatch({
        type: 'REMOVE_TANKS'
      })      
    }

    return nextTile < 5
  }

  function getWalkIndex() {
    const walkIndex = store.getState().player.walkIndex
    return walkIndex >= 1 ? 0 : walkIndex + 1
  }

  function dispatchMove(direction, newPos) {
    const walkIndex = getWalkIndex()
    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: newPos,
        direction: direction,
        spriteLocation: getSpriteLocation(direction, walkIndex),
        walkIndex: walkIndex,
        bullets: []
      }
    })
    console.log("player moves to " + newPos)
  }

  function attemptMove(direction) {
    const oldPos = store.getState().player.position
    const newPos = getNewPosition(oldPos, direction)    

    if (obeserveBoundaries(oldPos, newPos) && obeserveImpassable(oldPos, newPos))
      dispatchMove(direction, newPos)
    else {
      const walkIndex = getWalkIndex()
      store.dispatch({
        type: 'MOVE_PLAYER',
        payload: {
          position: store.getState().player.position,
          direction: direction,
          spriteLocation: getSpriteLocation(direction, walkIndex),
          walkIndex: walkIndex,
          bullets: []
        }
      })
    }

  }

  function fireBullet() {
    let bullets = store.getState().bullets

    bullets = bullets.concat({
      position: store.getState().player.position,
      direction: store.getState().player.direction,
      is_player: true
    })
    // console.log(bullets)
    store.dispatch({
      type: 'ADD_BULLETS',
      bullets: bullets
    })    
  }

  function handleKeyDown(e) {
    e.preventDefault()
    if (store.getState().world.gameover !== true && store.getState().world.game_win !== true) {
      switch (e.keyCode) {
        case 32:
          return fireBullet()

        case 37:
          return attemptMove('WEST')

        case 38:
          return attemptMove('NORTH')

        case 39:
          return attemptMove('EAST')

        case 40:
          return attemptMove('SOUTH')
                                  
        default:
          return console.log(e.keyCode)
      }
    }
  }

  window.addEventListener('keydown', (e) => {
    handleKeyDown(e)
  })

  return player
}