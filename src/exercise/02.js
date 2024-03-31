// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// extra credit - 3
// function useLocalStorageState(key, defaultValue = ''){

//   const [state, setState] = React.useState(()=>{
//     return window.localStorage.getItem(key) || defaultValue
//   })

//   React.useEffect(()=>{
//     window.localStorage.setItem(key, state)
//   }, [key, state])

//   return [state, setState]
// }

// extra credit - 4
function useLocalStorageState(key, defaultValue = '', {serialize = JSON.stringify, deserialize = JSON.parse} = {}){

  const [state, setState] = React.useState(()=>{
    
    const valueInLocalStorage = window.localStorage.getItem(key)
    if(valueInLocalStorage){
      return deserialize(valueInLocalStorage)
    }

    // execute function if given (lazy init.) or use value
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue

  })

  // removing old keys - requires reference to old one to compare
  const prevKeyRef = React.useRef(key)

  React.useEffect(()=>{
    const prevKey = prevKeyRef.current
    if(prevKey !== key){
      window.localStorage.removeItem(prevKey)
    }

    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))

  }, [key, state, serialize])

  
  return [state, setState]

}

function Greeting({defaultValue = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  // const [name, setName] = React.useState(window.localStorage.getItem('name') || initialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  // extra credit - 1
  // const [name, setName] = React.useState(() => {
  //   return window.localStorage.getItem('name') || initialName
  // })

  // extra credit - 2
  // React.useEffect(()=>{
  //   window.localStorage.setItem('name', name)
  // }, [name])


  const [name, setName] = useLocalStorageState("name", defaultValue)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
