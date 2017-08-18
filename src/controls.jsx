import React from 'react'
import PropTypes from 'prop-types'

const Controls = ({onStart, onStop, onRestart, startDisabled, stopDisabled, restartDisabled}) => {
  return <div>
    <h2>Controls</h2>
    <button onClick={onStart} disabled={startDisabled}>Start</button>
    <button onClick={onStop} disabled={stopDisabled}>Stop</button>
    <button onClick={onRestart} disabled={restartDisabled}>Restart</button>
  </div>
}

Controls.propTypes = {
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  startDisabled: PropTypes.bool.isRequired,
  stopDisabled: PropTypes.bool.isRequired,
  restartDisabled: PropTypes.bool.isRequired
}

export default Controls
