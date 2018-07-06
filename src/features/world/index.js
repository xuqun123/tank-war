import React from 'react'
import Map from '../map'
import Player from '../player'
import Tank from '../tank'
import GameOver from '../gameover'

import { connect } from 'react-redux'

function World(props) {  
  return(
    <div
      style={{
        position: 'relative',
        width: '800px',
        height: '400px',
        margin: '20px auto'
    }}>
      <Map />
      <Player/> 
      {props.tanks.map((tank, index) => <Tank key={tank.key_index} index={index} direction={tank.direction} position={tank.position}/> )}
      {props.gameover === true ? <GameOver/> : ""}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.world
  } 
}

export default connect(mapStateToProps)(World)