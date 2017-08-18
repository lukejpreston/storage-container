import React from 'react'
import PropTypes from 'prop-types'

const Time = ({value}) => {
  return <div>
    <h2>Time</h2>
    <b>{value}</b>
  </div>
}

Time.propTypes = {
  value: PropTypes.string.isRequired
}

export default Time
