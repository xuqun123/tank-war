import React from 'react'
import './styles.css'

class MoveButtons extends React.Component {
  handleClick(keyCode) {
    let event = document.createEvent("Events")
    event.initEvent("keydown", true, true)
    event.keyCode = keyCode
    document.dispatchEvent(event)  
  }

  render() {
    return(
      <div className='move-buttons'>
        <div 
          style={{
            position: 'absolute',
            marginTop: '50%',
            textAlign: 'center',
            left: 0,
            paddingLeft: '5%',
            zIndex: 1000,
          }}
        >
          <button onClick={(e) => this.handleClick(38)}>&uarr;</button>       
          <br/> 
          <button onClick={(e) => this.handleClick(37)}>&larr;</button>   
          &nbsp;     
          <button onClick={(e) => this.handleClick(39)}>&rarr;</button>        
          <br/>
          <button onClick={(e) => this.handleClick(40)}>&darr;</button>
        </div>
        <div 
          style={{
            position: 'absolute',
            marginTop: '50%',
            textAlign: 'center',
            right: 0,
            paddingRight: '5%',
            zIndex: 1000,
          }}
        >
          <br/>
          <button onClick={(e) => this.handleClick(32)}>Fire</button>       
        </div>        
      </div>
   )  
  }
}

export default MoveButtons