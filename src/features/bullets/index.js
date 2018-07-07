import React from 'react'
import { connect } from 'react-redux'
import Bullet from '../bullet'

function Bullets(props) {

  return(
    <div
      style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '800px',
        height: '480px',
      }}
    >
      {
        props.bullets.map( (bullet, index) => <Bullet key={index} position={bullet.position} direction={bullet.direction} is_player={bullet.is_player} /> )
      }      
    </div>
  )  
}

function mapStateToProps(state) {
  return {
    bullets: state.bullets
  }
}

export default connect(mapStateToProps)(Bullets)