import clone from 'clone'
import merge from 'merge'
import createHistory from 'history/createBrowserHistory'
import cookies from 'js-cookie'
import store from 'store'

window.cookies = cookies

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

  const set = (name, data) => {
    const toMerge = {}
    toMerge[name] = data
    state = merge.recursive(true, state, toMerge)
    reduce()
  }

  const storageContainer = {
    set,
    local: {
      set (name, data) {
        set(name, data)
        store.set(name, data)
      },
      remove (name) {
        const data = store.get(name)
        store.remove(name)
        set(name, data)
      }
    },
    cookie: {
      set (name, data) {
        set(name, data)
        cookies.set(name, data)
      },
      remove (name) {

      }
    },
    get: () => state,
    location,
    go
  }

  const actionInstance = actions(storageContainer)
  state = merge.recursive(true, initialState, actionInstance)

  const localStorageData = {}
  store.each((value, key) => {
    localStorageData[key] = value
  })
  state = merge.recursive(true, state, localStorageData)

  const cookieData = {}
  const allCookies = cookies.get()
  Object.keys(allCookies).forEach(key => {
    let value = allCookies[key]
    try {
      value = JSON.parse(value)
    } catch (ignoreError) {}
    cookieData[key] = value
  })
  state = merge.recursive(true, state, cookieData)

  reduce()

  isSet = true

  return storageContainer
}
