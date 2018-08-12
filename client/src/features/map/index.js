import React from 'react'
import Bullets from '../bullets'

import { connect } from 'react-redux'
import {SPRITE_SIZE} from '../../config/constants'

import './styles.css'

function getTileSprite(type) {
  switch (type) {
    case 0:
      return 'grass'
    case 1:
      return 'shelter'
    case 4:
      return 'star'                  
    case 5:
      return 'wall'      
    case 6:
      return 'rock'            
    case 7:
      return 'water'      
    case 8:
      return 'rock-cube'                        
    case 9:
      return 'boom'
    case 10:
      return 'eagle'
    case 10.1:
      return 'eagle left-top'          
    case 10.2:
      return 'eagle right-top'          
    case 10.3:
      return 'eagle left-bottom'          
    case 10.4:
      return 'eagle right-bottom'
    case 11:
      return 'flag'
    case 11.1:
      return 'flag left-top'          
    case 11.2:
      return 'flag right-top'          
    case 11.3:
      return 'flag left-bottom'          
    case 11.4:
      return 'flag right-bottom'      
    case 12:
      return 'star-wall'      
    default:
      return 'grass'
  }
}

function MapTile(props) {
  return (
    <div 
      className={`tile ${getTileSprite(props.tile)}`}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE
      }}
    />
  )
}

function MapRow(props) {
  return (
    <div className="row" style={{height: SPRITE_SIZE}}>
      { props.tiles.map( (tile, index) => <MapTile key={index} tile={tile} /> ) }
    </div>
  )
}

function Map(props) {
  return (
    <div
      style={{
        position: 'absoule',
        top: '0px',
        left: '0px',
        width: '800px',
        height: '480px'
      }}
    >
      {
        props.tiles.map( (row, index) => <MapRow key={index} tiles={row} /> )
      }
      <Bullets/>
    </div>
  )
}

function mapStateToProps(state) {
 return {
    ...state.map
 } 
}

export default connect(mapStateToProps)(Map)