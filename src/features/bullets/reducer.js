const intialState = {
  bullets: [],
  last_bullet_position: [0,0]
}

const bulletsReducer = (state=intialState, action) => {
  switch(action.type) {
    case 'ADD_BULLETS':
      return {
        ...action.payload
      }
    case 'REMOVE_BULLETS':
      return {
        ...action.payload
      }      
    case 'ADD_LAST_BULLET_FRAME_ID':
      return {
        ...action.payload
      }            
    default:
      return state
  }
}

export default bulletsReducer