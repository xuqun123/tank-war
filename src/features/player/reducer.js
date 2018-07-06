const intialState = {
  position: [280, 460],
  spriteLocation: '0px 60px',
  direction: 'NORTH',
  walkIndex: 0,
  bullets: []
}

const playerReducer = (state=intialState, action) => {
  switch(action.type) {
    case 'MOVE_PLAYER':
      return {
        ...action.payload
      }
    case 'ADD_BULLET':
      return {
        ...action.payload
      }      
    default:
      return state
  }
}

export default playerReducer