import React from 'react'

class RotateWarning extends React.Component {
  render() {
    return(
      <div className="screen-rotate-warning" 
        style={{
          position: 'absolute',
          top: 0,
          width: '810px',
          height: '1200px',
          fontSize: '30px',
          color: 'red',
          zIndex: 1000,
          opacity: 0.7,
          paddingTop: '400px',
          textAlign: 'center',
          backgroundColor: 'white'
        }}>
        Please rotate your screen to landscape!
      </div>
   )  
  }
}

export default RotateWarning