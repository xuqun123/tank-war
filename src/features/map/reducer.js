const intialState = {
  tiles: []
}

const mapReducer = (state=intialState, action) => {
  switch(action.type) {
    case 'ADD_TILES':
      return {
        ...action.payload
      }
    default:
      return state
  }
}

export default mapReducer