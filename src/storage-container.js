import createHistory from 'history/createBrowserHistory'
// import cookies from 'cookies'
// import store from 'store'

export default ({onChange, initialState, actions, reducer, urls}) => {
  let isSet = false
  const history = createHistory()

  let state = Object.assign({}, initialState)
  const storageContainer = {
    set: (name, data) => {
      const oldData = Object.assign({}, state)
      state[name] = state[name] || {}
      state[name] = Object.assign({}, state[name], data)
      if (isSet) {
        const reduced = reducer(storageContainer)
        console.log(reduced)
        state = Object.assign({}, state, reduced)
        onChange(state, oldData)
      }
    },
    get: () => state,
    location: () => {
      const location = history.location
      let pathname = location.pathname.toLowerCase()
      if (pathname.startsWith('/')) pathname = pathname.replace('/', '')
      location.pathname = pathname
      return location
    },
    go: pathname => history.push(pathname)
  }

  const generateActions = actions(storageContainer)
  Object.keys(generateActions).forEach(key => {
    state[key] = state[key] || {}
    state[key] = Object.assign({}, state[key], generateActions[key])
  })

  const reduced = reducer(storageContainer)
  Object.keys(reduced).forEach(key => {
    storageContainer.set(key, reduced[key])
  })
  isSet = true

  return storageContainer
}
