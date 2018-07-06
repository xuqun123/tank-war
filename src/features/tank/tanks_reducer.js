const intialState = []

const tanksReducer = (state=intialState, action) => {
  switch(action.type) {     
    case 'ADD_TANK':
      return [
        ...state,
        {
          position: action.position, 
          direction: action.direction
        }
      ]
    case 'UPDATE_TANK':
      return state.map((tank, index) => {
        if (index === action.index) {
          return Object.assign({}, tank, {
            position: action.position, 
            direction: action.direction
          })
        }
        return tank
      })
    default:
      return state
  }
}

export default tanksReducer