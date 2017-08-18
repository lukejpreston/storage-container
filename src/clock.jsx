import React, { Component } from 'react'
import Controls from './controls'
import Format from './format'
import Time from './time'

import StorageContainer from './storage-container'
import initialState from './initial-state'
import actions from './actions'
import reducer from './reducer'
import urls from './urls'

class Clock extends Component {
  constructor (props) {
    super(props)

    this.storageContainer = StorageContainer({
      onChange: state => this.setState(state),
      initialState,
      actions,
      reducer,
      urls
    })
  }
  render () {
    return (
      <div className='clock'>
        <h1>This clock stores the current time in local storage, it stores the format in the url</h1>
        <Controls
          {...this.storageContainer.get().controls}
        />
        <Format
          onHoursChange={() => {}}
          onMinutesChange={() => {}}
          onSecondsChange={() => {}}
          {...this.storageContainer.get().format}
        />
        <Time {...this.storageContainer.get().time} />
      </div>
    )
  }
}

export default Clock
