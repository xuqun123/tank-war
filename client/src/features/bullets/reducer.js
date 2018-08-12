const intialState = []

const bulletsReducer = (state=intialState, action) => {
  switch(action.type) {
    case 'ADD_BULLETS':
      return action.bullets
      
    case 'REMOVE_BULLETS':
      return action.bullets
            
    case 'ADD_LAST_BULLET_FRAME_ID':
      return action.bullets
                  
    default:
      return state
  }
}

export default bulletsReducer