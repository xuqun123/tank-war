import React, { Component } from 'react'
import World from './features/world'
import RotateWarning from './features/rotate_warning'
import { tiles } from './data/maps/1'
import store from './config/store'
import {SPRITE_SIZE} from './config/constants'

class App extends Component {
  componentDidMount() {
    store.dispatch({
      type: 'ADD_TILES',
      payload: {
        tiles: this.setupTiles(tiles),
        bullets: []
      }
    })

    store.dispatch({
      type: 'ADD_TANK',
      position: [0,0],
      direction: 'SOUTH',
      key_index: Date.now()
    })  
    store.dispatch({
      type: 'ADD_TANK',
      position: [780,460],
      direction: 'NORTH',
      key_index: Date.now() + 1
    })         
    store.dispatch({
      type: 'ADD_TANK',
      position: [740,0],
      direction: 'WEST',
      key_index: Date.now() + 2
    })             
  }

  setupTiles(tiles) {
    let newTiles = tiles
    let treasure = this.getTreasureLocation()
    while(newTiles[treasure[0]][treasure[1]] !== 5) {
      treasure = this.getTreasureLocation()
    } 
    newTiles[treasure[0]][treasure[1]] = 12
    console.log("setup treasure at " + [treasure[1]*SPRITE_SIZE, treasure[0]*SPRITE_SIZE])

    return newTiles
  }

  getTreasureLocation() {
    return [Math.round(Math.random()*23), Math.round(Math.random()*39)]
  }

  render() {
    return (
      <div>
        <RotateWarning/>
        <World/>
      </div>
    )
  }
}


export default App
