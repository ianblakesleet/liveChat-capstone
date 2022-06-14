import AuthScreen from './components/AuthScreen'
import Dashboard from './components/Dashboard'
import styles from './App.module.css'

const App = () => {
  // if (authenticated) {
  //   return <AuthScreen />
  // }

  return (
    <div className="App">
      <Dashboard />
    </div>
  )
}

export default App
