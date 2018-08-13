import React from 'react'
import Map from '../map'
import Player from '../player'
import Tank from '../tank'
import GameWin from '../game_win'
import GameOver from '../gameover'
import GameIntro from '../game_intro'
import MoveButtons from '../move_buttons'

import { connect } from 'react-redux'

function World(props) {  
  return(
    <div
      style={{
        position: 'relative',
        width: '800px',
        height: '480px',
        margin: '5% auto',
        border: '4px solid white',
    }}>
      <MoveButtons/>
      <Map />
      <Player/> 
      {props.tanks.map((tank, index) => <Tank key={tank.key_index} index={index} direction={tank.direction} position={tank.position}/> )}
      {props.gameover === true ? <GameOver/> : ""}
      {props.game_win === true ? <GameWin/> : ""}
      <GameIntro/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.world
  } 
}

export default connect(mapStateToProps)(World)