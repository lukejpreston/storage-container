export default (state, location) => {
  const pathname = location.pathname

  let time = ''
  const hours = '00'
  const minutes = '00'
  const seconds = '00'
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
