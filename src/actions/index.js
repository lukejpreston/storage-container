export default (storageContainer) => {
  return {
    controls: {
      onStart: () => {
        storageContainer.set('controls', {
          startDisabled: true,
          stopDisabled: false,
          restartDisabled: false
        })
      },
      onStop: () => {
        storageContainer.set('controls', {
          startDisabled: false,
          stopDisabled: true,
          restartDisabled: true
        })
      },
      onRestart: () => {
      }
    },
    format: {
      onHoursChange: (event) => {
        const location = storageContainer.location()
        let pathname = location.pathname

        if (pathname === '') pathname = 'hhmmss'

        if (event.target.checked) pathname = 'hh' + pathname
        else pathname = pathname.replace('hh', '')

        storageContainer.set('format', {
          hoursChecked: event.target.checked
        })

        storageContainer.go(pathname)
      },
      onMinutesChange: (event) => {
        const location = storageContainer.location()
        let pathname = location.pathname

        if (pathname === '') pathname = 'hhmmss'

        if (event.target.checked) {
          if (pathname.includes('hh')) pathname = pathname.replace('hh', 'hhmm')
          else if (pathname.includes('ss')) pathname = pathname.replace('ss', 'mmss')
          else pathname = 'mm'
        } else pathname = pathname.replace('mm', '')

        storageContainer.set('format', {
          minutesChecked: event.target.checked
        })

        storageContainer.go(pathname)
      },
      onSecondsChange: (event) => {
        const location = storageContainer.location()
        let pathname = location.pathname

        if (pathname === '') pathname = 'hhmmss'

        if (event.target.checked) pathname = pathname + 'ss'
        else pathname = pathname.replace('ss', '')

        storageContainer.set('format', {
          secondsChecked: event.target.checked
        })

        storageContainer.go(pathname)
      }
    }
  }
}
