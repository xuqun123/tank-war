import React from 'react'
import bullet from './bullet.png'

import store from '../../config/store'
import {SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT, FLAG_POSITION} from '../../config/constants'

class Bullet extends React.Component {
 constructor(props) {
    super(props)
    this.state = {
      direction: props.direction,
      position: props.position,
      rotate: this.directionToRotateDegree(props.direction),
      display: true,
      is_player: props.is_player
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 50)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }  

  tick() {
    let newPos = this.getBulletPosition(this.state.direction, this.state.position, 5)
    this.setState({
      position: newPos
    })

    if(this.obeserveBoundaries(newPos) && this.obeserveImpassable(newPos)){
    } else {
      this.setState({
        display: false
      })      
      clearInterval(this.timerID)      
    }
  }

  obeserveBoundaries(newPos) {
    return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
           (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE) 
  }

  obeserveImpassable(newPos) {
    const tiles = store.getState().map.tiles
    const y = newPos[1] / SPRITE_SIZE
    const x = newPos[0] / SPRITE_SIZE
    const nextTile = tiles[y][x]
    this.hitTank(tiles, newPos, x, y)    
    this.hitPlayer(tiles, newPos, x, y)
    this.updateTiles(tiles, newPos, x, y)
    
    return nextTile < 5
  }

  releaseBoom(tiles, x, y) {
    tiles[y][x] = 9
    store.dispatch({
      type: 'ADD_TILES',
      payload: {
        tiles: tiles,
        bullets: []
      }
    })
    tiles[y][x] = 0
    setTimeout(() => {
      store.dispatch({
          type: 'UPDATE_TILES',
          payload: {
          tiles: tiles,
          bullets: []
        }
      })
    }, 100)
  }

  hitTank(tiles, newPos, x, y) {
    const tanks = store.getState().world.tanks
    tanks.map((tank, index) => {
      if(tank.position[0] === newPos[0] && tank.position[1] === newPos[1]){
        console.log("hint tank " + index)
        this.releaseBoom(tiles, x, y)
        store.dispatch({
          type: 'REMOVE_TANK',
          index: index
        })

        if (store.getState().world.tanks && store.getState().world.tanks.length === 0) {
          store.dispatch({
            type: 'GAME_WIN'
          })
        }
      }
      return null
    })
  }

  hitPlayer(tiles, newPos, x, y) {
    if (this.state.is_player !== true){  
      const player = store.getState().player
      if(player.position[0] === newPos[0] && player.position[1] === newPos[1]){
        console.log("hint player at " + newPos)
        this.releaseBoom(tiles, x, y)
        store.dispatch({
          type: 'HIDE_PLAYER'
        })
        store.dispatch({
          type: 'GAMEOVER'
        })   
      }
    }
  }  

  updateTiles(tiles, newPos, x, y) {
    const nextTile = tiles[y][x]
    switch(nextTile) {      
      case 5:
        this.releaseBoom(tiles, x, y)
        break  

      case 10:
        FLAG_POSITION.map((row) => tiles[row[0]][row[1]] = 11)
        store.dispatch({
          type: 'ADD_TILES',
          payload: {
            tiles: tiles,
            bullets: []
          }
        }) 
        store.dispatch({
          type: 'GAMEOVER'
        })            
        break    

      case 12:
        this.releaseBoom(tiles, x, y)
        tiles[y][x] = 4
        store.dispatch({
          type: 'ADD_TILES',
          payload: {
            tiles: tiles,
            bullets: []
          }
        }) 
        console.log("find tresure at " + newPos)
        break        

      default:
        break
    }
  }

  getBulletPosition(direction, oldPos) {
    switch(direction) {
      case 'SOUTH':
        return [oldPos[0], oldPos[1] + 20]
      case 'EAST':
        return [oldPos[0] + 20, oldPos[1]]
      case 'WEST':
        return [oldPos[0] - 20, oldPos[1]]
      case 'NORTH':
        return [oldPos[0], oldPos[1] - 20]
      default:
        return [0, 0]
    }
  }  

  directionToRotateDegree(direction) {
    switch(direction) {
      case 'SOUTH':
        return 180
      case 'EAST':
        return 90
      case 'WEST':
        return 270
      case 'NORTH':
        return 0
      default:
        return 0
    }
  }

  render() {
    return(
      <div 
        style={{
          top: this.state.position[1],
          left: this.state.position[0],
          backgroundImage: `url(${bullet})`,
          width: '20px',
          height: '20px',
          position: 'absolute',
          backgroundPosition: "0px 0px",
          display: this.state.display === false ? "none" : "block",
          transform: `rotate(${this.state.rotate}deg)`
        }}
      />
   )  
  }
}

export default Bullet