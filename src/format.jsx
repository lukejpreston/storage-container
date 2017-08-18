import React from 'react'
import PropTypes from 'prop-types'

const Format = ({onHoursChange, onMinutesChange, onSecondsChange, hoursChecked, minutesChecked, secondsChecked}) => {
  return <div>
    <h2>Format</h2>
    <label>Hours</label>
    <input type='checkbox' onChange={onHoursChange} checked={hoursChecked} />
    <label>Minutes</label>
    <input type='checkbox' onChange={onMinutesChange} checked={minutesChecked} />
    <label>Seconds</label>
    <input type='checkbox' onChange={onSecondsChange} checked={secondsChecked} />
  </div>
}

Format.propTypes = {
  onHoursChange: PropTypes.func.isRequired,
  onMinutesChange: PropTypes.func.isRequired,
  onSecondsChange: PropTypes.func.isRequired,
  hoursChecked: PropTypes.bool.isRequired,
  minutesChecked: PropTypes.bool.isRequired,
  secondsChecked: PropTypes.bool.isRequired
}

export default Format
