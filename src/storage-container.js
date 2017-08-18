import clone from 'clone'
import merge from 'merge'
import createHistory from 'history/createBrowserHistory'
// import cookies from 'cookies'
// import store from 'store'

export default ({
  onChange,
  initialState,
  actions,
  reducer,
  urls
}) => {
  let isSet = false
  const history = createHistory()
  let state = {}

  const location = () => {
    const location = history.location
    let pathname = location.pathname.toLowerCase()
    if (pathname.startsWith('/')) pathname = pathname.replace('/', '')
    location.pathname = pathname
    return location
  }

  const reduce = () => {
    const oldState = clone(state)
    const reduced = reducer(oldState, location()) || {}
    state = merge.recursive(true, oldState, reduced)
    if (isSet) onChange(state, oldState)
  }

  const go = pathname => {
    history.push(pathname)
    reduce()
  }

  const storageContainer = {
    set: (name, data) => {
      const toMerge = {}
      toMerge[name] = data
      state = merge.recursive(true, state, toMerge)
      reduce()
    },
    get: () => state,
    location,
    go
  }

  const actionInstance = actions(storageContainer)
  state = merge.recursive(true, initialState, actionInstance)
  reduce()

  isSet = true

  return storageContainer
}
