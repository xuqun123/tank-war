import store from '../../config/store'

var Loop = function(func) {
    let requestID
    (function loop(time) {
      func(Math.min((Date.now() - time) / 1000, 1))
        requestID = window.requestAnimationFrame(loop.bind(null, Date.now()))
        store.dispatch({
          type: 'ADD_LAST_BULLET_FRAME_ID',
          payload: {
            bullets: store.getState().bullets.bullets,
            last_bullet_position: store.getState().bullets.last_bullet_position,
            last_bullet_frame_id: store.getState().bullets.last_bullet_frame_id.concat([requestID])
          }
        })          
    })(Date.now())
}

export default Loop
