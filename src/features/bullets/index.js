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
        props.bullets.map( (row, index) => <Bullet key={index} position={[row[0], row[1]]} direction={row[2]} /> )
      }      
    </div>
  )  
}

function mapStateToProps(state) {
  return {
    ...state.bullets
  }
}

export default connect(mapStateToProps)(Bullets)