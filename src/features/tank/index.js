import React from 'react'
import walkSprite from './tank1.png'
import store from '../../config/store'
import {SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT, FLAG_POSITION} from '../../config/constants'

class Tank extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: props.direction,
      position: props.position,
      rotate: 0,
      index: props.index
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 200)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }  

  tick() {
    let newPos = this.getBulletPosition(this.state.direction, this.state.position)
  
    if(this.obeserveBoundaries(newPos) && this.obeserveImpassable(newPos)){
      this.setState({
        position: newPos,
        rotate: this.directionToRotateDegree(this.state.direction)
      })     
      store.dispatch({
        type: 'UPDATE_TANK',
        index: this.state.index,
        position: newPos,
        direction: this.state.direction
      })         
    } else {
      this.changeDirection()
    }
  }

  changeDirection() {
    const random = Math.random()
    let direction
    if (random < 0.25){
      direction = "SOUTH"
    } else if (random >= 0.25 && random < 0.5){
      direction = "NORTH"
    } else if (random >= 0.5 && random < 0.75){
      direction = "EAST"
    } else {
      direction = "WEST"
    }
    this.setState({
      direction: direction,
      rotate: this.directionToRotateDegree(direction)
    })
    store.dispatch({
        type: 'UPDATE_TANK',
        index: this.state.index,
        position: this.state.position,
        direction: direction
    })      
    // console.log("change direction to: " + direction )
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
    // this.updateTiles(tiles, x, y)

    return nextTile < 5
  }  
  
  getBulletPosition(direction, oldPos) {
    const random = Math.random()
    if (random >= 0.9)
      this.changeDirection() 

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
          position: 'absolute',
          top: this.state.position[1],
          left: this.state.position[0],
          backgroundImage: `url(${walkSprite})`,
          transform: `rotate(${this.state.rotate}deg)`,          
          width: '20px',
          height: '20px'}}>
      </div>
    )      
  }
}

export default Tank