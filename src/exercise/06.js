// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import { PokemonForm, PokemonInfoFallback, PokemonDataView, fetchPokemon } from '../pokemon'
import { ErrorBoundary } from 'react-error-boundary' // extra credit - 6

// extra credit - 4 
// class ErrorBoundary extends React.Component {
//   state = {error: null}
//   static getDerivedStateFromError(error){
//     return {error}
//   }

//   render(){
//     const { error } = this.state
//     if(error){
//       return <this.props.FallbackComponent error={error} />
//       // return (
//       //   <div role="alert">
//       //     There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//       //   </div>
//       // )
//     }

//     return this.props.children
//   }
// }



function PokemonInfo({pokemonName}) {
  // // 🐨 Have state for the pokemon (null)
  // const [pokemon, setPokemon] = React.useState(null)

  // // extra credit - 1
  // const [error, setError] = React.useState(null)

  // // extra credit - 2
  // const [status, setStatus] = React.useState('idle')

  // extra credit - 3
  const [state, setState] = React.useState({
    status: pokemonName ? 'pending' : 'idle', // to accomodate for the remounts
    pokemon: null,
    error: null
  })

  const { status, pokemon, error } = state

  React.useEffect(()=>{
    if(!pokemonName) {
      return 
    }

    // extra credit - 2
    // setStatus('pending')
    // fetchPokemon(pokemonName).then(
    //   pokemonData => {
    //     setStatus('resolved')
    //     setPokemon(pokemonData)
    //   },
    //   error => {
    //     setError(error)
    //     setStatus('rejected')
    //   }
    // )

    // extra credit - 3
    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({pokemon, status: 'resolved'})
      },
      error => {
        setState({error, status: 'rejected'})
      },
    )

  }, [pokemonName])


  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // if(error){
  //   return (
  //     <div role="alert">
  //       There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
  //     </div>
  //   )
  // }
  
  // if (!pokemonName) {
  //   return 'Submit a pokemon'
  // }
  // else if (!pokemon){
  //   return <PokemonInfoFallback name={pokemonName} />
  // }
  // else{
  //   return <PokemonDataView pokemon={pokemon} />
  // }

  // extra credit - 2
  if(status === 'idle'){
    return 'Submit a Pokemon'
  }
  else if (status === 'pending'){
    return <PokemonInfoFallback name={pokemonName} />
  }
  else if (status === 'rejected'){
   throw error
  } 
  else if (status === 'resolved'){
    return <PokemonDataView pokemon={pokemon} />
  }
}

function ErrorFallback({error, resetErrorBoundary}){
  return (
    <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}> Try Again </button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset(){
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* extra credit - 5*/}
        {/* <ErrorBoundary key={pokemonName} FallbackComponent={ErrorFallback}> */}
        {/* extra credit - 7*/}
        {/* <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}> */}
        {/* extra credit - 8*/}
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
