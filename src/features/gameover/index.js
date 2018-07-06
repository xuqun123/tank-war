import React from 'react'
import {MAP_WIDTH, MAP_HEIGHT} from '../../config/constants'

class Gameover extends React.Component {
 constructor(props) {
    super(props)
    this.state = {
      height: 0,
      position: [280,230]
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 50)
  }

  tick() {
    const height = this.state.height
    if (height >= MAP_HEIGHT){
      this.setState({
        height: MAP_HEIGHT
      })            
      clearInterval(this.timerID)   

      setInterval(() => this.moveHeader(), 500)         
    } else {
      this.setState({
        height: height + 50
      })      
    }
  }

  moveHeader() {
    let random1 = Math.random()
    let random2 = Math.random()
  
    const newPos = [random1*500,random2*480]
   
    this.setState({
      position: newPos
    }) 
  }

  render() {
    return(
      <div 
        style={{
          backgroundColor: "white",
          opacity: 0.5,
          top: 0,
          left: 0,
          height: this.state.height,
          width: MAP_WIDTH,
          position: 'absolute',
          padding: "2px",
          color: "red",
        }}
      >
        <h1 style={{position: 'relative', top: this.state.position[1], left: this.state.position[0]}}>Gameover</h1>
      </div>
   )  
  }
}

export default Gameover