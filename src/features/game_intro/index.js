import React from 'react'
// import playerTank from '../../../public/tiles/player-tank.png'

import './styles.css'

function GameIntro(props) {
  return(
    <div
      style={{
        position: 'relative',
        background: "#ffffff",
        marginBottom: "40px",
        height: "200px",
        borderRadius: "5px",
        boxShadow: "0px 0px 2px 2px rgba(105, 90, 166, 0.3)",
        border: "1px solid white",
    }}> 
      <div className='col-md-4'>
        <h4 className='pad-20'>Operation:</h4>
        <ul>
          <li>move up: &uarr; </li>        
          <li>move down: &darr; </li>        
          <li>move left: &larr; </li>        
          <li>move right: &rarr; </li>
          <li>open fire: <strong>space key</strong> </li>
        </ul>
      </div>
      <div className='col-md-4'>
        <h4>To win:</h4>
          <p>Eliminate all enemy tanks <img alt="" src='/tiles/enemy-tank.png'/> </p>
          <strong>
          Or
          </strong>
          <p>Find and catch the star <img alt="" src='/tiles/star.png'/></p>
      </div>      
      <div className='col-md-4'>
        <h4>To lose:</h4>
          <p>Player tank <img alt="" src='/tiles/player-tank.png'/> is shot</p>
          <strong>
          Or
          </strong>
          <p>The eagle base <img alt="" src='/tiles/eagle.png' width="20px"/> is destroyed</p>
      </div>      
    </div>
  )  
}

export default GameIntro