const intialState = {
  position: [0, 0],
  rotate: 0
}

const bulletReducer = (state=intialState, action) => {
  switch(action.type) {
    case 'CHANGE_BULLET_DIRECTION':
      return {
        ...action.payload
      }    
    case 'FIRE_BULLET':
      return {

        ...action.payload
      }
    default:
      return state
  }
}

export default bulletReducer