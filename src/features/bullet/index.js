import React from 'react'
import bullet from './bullet.png'
import Loop from "./Loop"

import store from '../../config/store'
import {SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT} from '../../config/constants'

class Bullet extends React.Component {
 constructor(props) {
    super(props)
    this.state = {
      direction: props.direction,
      position: props.position,
      rotate: this.directionToRotateDegree(props.direction),
      display: true
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 50)
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

    if (nextTile === 5) {
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
            type: 'ADD_TILES',
            payload: {
            tiles: tiles,
            bullets: []
          }
        })
      }, 100)      
    }

    return nextTile < 5
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