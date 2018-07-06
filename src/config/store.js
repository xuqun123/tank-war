import { createStore, combineReducers } from 'redux'
import playerReducer from '../features/player/reducer'
import bulletReducer from '../features/bullet/reducer'
import bulletsReducer from '../features/bullets/reducer'
import mapReducer from '../features/map/reducer'

const rootReducer = combineReducers({
  player: playerReducer,
  bullet: bulletReducer,
  bullets: bulletsReducer,
  map: mapReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store