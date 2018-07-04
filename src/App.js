import React, { Component } from 'react'
import Map from './features/map'
import Player from './features/player'
import World from './features/world'

class App extends Component {
  render() {
    return (
      <div>
        <World/>
      </div>
    )
  }
}

export default App
