# Storage Container

This is an alternative to redux and should work with react and inferno in particular but there is no reason it couldn't work with other things. It combines multiple kinds of storage so you don't have to

## Usage

```js
import StorageContainer from 'storage-container'

const storageContainer = StorageContainer({
    onChange: (newState, oldState) => console.log(newState, oldState),
    initialState: {
        name_0: {},
        name_1: {}
    },
    actions: {
        name_0: {
            action_0 (storageContainer) {},
            action_1 (storageContainer) {}
        }
    },
    reducers: {
        name_0: {
            reducer_0 (storageContainer) {},
            reducer_1 (storageContainer) {}
        }
    },
    urls: {
        'name_0': {
            pathname: '',
            alias: ['name_0', 'name0', 'name-0', '0'],
            subname: {
                pathname: 'subname',
                alias: ['subname_0', '/subname0', '/subname-0', '0'],
            }
        }
    }
})

// in-memory usage

storageContainer.name_0.set({ a: 1 })
storageContainer.name_0.override({})
storageContainer.name_0.reset()
storageContainer.name_0.get()
storageContainer.name_0.actions()

storageContainer.set({})
storageContainer.override({})
storageContainer.reset()
storageContainer.get()
storageContainer.actions()

// local storage

storageContainer.name_0.local.save({a: 1})
storageContainer.name_0.local.remove({a: 1})
storageContainer.saveLocal('name', 'value')
storageContainer.getLocal('name)

// cookie storage

storageContainer.name_0.cookie.save({a: 1})
storageContainer.name_0.cookie.remove({a: 1})
storageContainer.saveCookie('name', 'value')
storageContainer.getCookie('name)

// history

storageContainer.go('/url')
storageContainer.name_0.go()
storageContainer.name_0.subname.go()
storageContainer.location()
```

### With React (or similarly with Inferno)

going to make a stopwatch which starts the time, you can stop it, restart it and it saves your time to local storage so when you refresh the page it will be there, it also changes the time using the route so /hh-mm-ss will give hours minutes and seconds where as /hh-mm will only give hours and minutes etc.



```js
import React from 'react'

const Ticker = ({start, stop, restart, startDisabled, stopDisabled, restartDisabled}) => {
    return <div>
        <h2>Ticker</h2>
        <button onClick={start} disabled={startDisabled}>Start</button>
        <button onClick={stop} disabled={stopDisabled}>Stop</button>
        <button onClick={restart} disabled={restartDisabled}>Restart</button>
    </div>
}
```

```js
import React from 'react'

const Format = ({toggleHours, toggleMinutes, toggleSeconds, hoursChecked, minutesChecked, secondsChecked}) => {
    return <div>
        <h2>Format</h2>
        <input type="checkbox" checked={hoursChecked} onChange={toggleHours} />
        <label>Hours</label>
        <input type="checkbox" checked={minutesChecked} onChange={toggleMinutes} />
        <label>Minutes</label>
        <input type="checkbox" checked={secondsChecked} onChange={toggleSeconds} />
        <label>Seconds</label>
    </div>
}
```

```js
import React from 'react'

const Time = ({value}) => {
    return <div>
        <h2>Time</h2>
        <span>{value}</span>
    </div>
}
```

```json
{
    "ticker": {
        "startDisabled": false,
        "stopDisabled": true,
        "restartDisabled": true
    },
    "format": {
        "hoursChecked": true,
        "minutesChecked": true,
        "secondsChecked": true
    },
    "time": {
        "seconds": 0,
        "value": "00:00:00"
    }
}
```

```js
const tickerActions = {
    start (storageContainer) {
        const interval = setInterval(() => {
            const seconds = storageContainer.time.get().seconds
            storageContainer.time.save({
                seconds: seconds + 1
            })
        }, 1000)

        storageContainer.ticker.set({
            startDisabled: true,
            stopDisabled: false,
            restartDisabled: false,
            interval
        })
    },
    stop (storageContainer) {
        clearInterval(storageContainer.ticker.get().interval)

        storageContainer.ticker.set({
            startDisabled: false,
            stopDisabled: true,
            restartDisabled: true
        })
    },
    restart (storageContainer) {
        storageContainer.ticker.get().stop()                        
        storageContainer.time.save({
            seconds: 0
        })
        storageContainer.ticker.get().start()
    }
}
```

```js
const actions = {
    ticker: tickerActions
}
```

```js
const reducers = {

}
```

```js
import React from 'react'
import StorageContainer from 'storage-container'
import Actions from './actions'
import Reducers from './reducers'
import initialState from './initial-state'
import urls from './urls'

const StopWatch extends React.Component({
    constructor(props) {
        super(props)
        this.storageContainer = StorageContainer({
            onChange: (newState, oldState) => this.setState(newState),
            initialState,
            actions,
            reducers,
            urls
        })
    }
    render () {
        return <div>
            <Ticker {...this.storageContainer.ticker.get()} >
            <Format {...this.storageContainer.format.get()}>
            <Time {...this.storageContainer.time.get()} >
        </div>
    }
})
```

```js
import ReactDOM from 'react-dom'

```