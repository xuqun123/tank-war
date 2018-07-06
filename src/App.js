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
