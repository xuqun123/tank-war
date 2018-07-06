import React, { Component } from 'react'
import World from './features/world'
import { tiles } from './data/maps/1'
import store from './config/store'

class App extends Component {
  componentDidMount() {
    store.dispatch({
      type: 'ADD_TILES',
      payload: {
        tiles: tiles,
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

  render() {
    return (
      <div>
        <World/>
      </div>
    )
  }
}


export default App
