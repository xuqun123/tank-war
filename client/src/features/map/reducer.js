const intialState = {
  tiles: []
}

const mapReducer = (state=intialState, action) => {
  switch(action.type) {
    case 'ADD_TILES':
      return {
        ...action.payload
      }
    case 'UPDATE_TILES':
      return {
        ...action.payload
      }      
    case 'ADD_MAP_BULLETS':
      return {
        ...action.payload
      }      
    default:
      return state
  }
}

export default mapReducer