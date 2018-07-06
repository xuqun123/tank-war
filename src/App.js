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
      direction: 'SOUTH'
    })  
    store.dispatch({
      type: 'ADD_TANK',
      position: [780,460],
      direction: 'NORTH'
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
