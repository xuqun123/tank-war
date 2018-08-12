import React from 'react'
import { connect } from 'react-redux'
import playerTank from './tank1.png'
import handleMovement from './movement'

function Player(props) {
  return(
    <div
      style={{
        position: 'absolute',
        top: props.position[1],
        left: props.position[0],
        display: props.hidden === true ? "none" : "block",
        backgroundImage: `url(${playerTank})`,
        backgroundPosition: props.spriteLocation,
        width: '20px',
        height: '20px'}}>
    </div>
  )  
}

function mapStateToProps(state) {
  return {
    ...state.player
  }
}

export default connect(mapStateToProps)(handleMovement(Player))