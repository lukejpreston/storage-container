export default (state, location) => {
  const pathname = location.pathname

  const number = state.time.number

  let time = ''
  let hours = ''
  let minutes = ''
  let seconds = ''

  const hoursCount = Math.floor(number / 60 / 60)
  if (hoursCount < 10) hours = '0' + hoursCount
  else hours = '' + hoursCount

  const minutesCounts = Math.floor(number / 60) - hoursCount * 60
  if (minutesCounts < 10) minutes = '0' + minutesCounts
  else minutes = '' + minutesCounts

  const secondsCount = number - hoursCount * 60 * 60 - minutesCounts * 60
  if (secondsCount < 10) seconds = '0' + secondsCount
  else seconds = '' + secondsCount

  if (pathname === '') time += `${hours}:${minutes}:${seconds}`
  else {
    if (pathname.includes('hh')) time += hours
    if (time.length > 0 && pathname.includes('mm')) time += ':' + minutes
    else if (pathname.includes('mm')) time += minutes
    if (time.length > 0 && pathname.includes('ss')) time += ':' + seconds
    else if (pathname.includes('ss')) time += seconds
  }

  return {
    time: {
      value: time
    },
    format: {
      hoursChecked: pathname.includes('hh') || pathname === '',
      minutesChecked: pathname.includes('mm') || pathname === '',
      secondsChecked: pathname.includes('ss') || pathname === ''
    }
  }
}
