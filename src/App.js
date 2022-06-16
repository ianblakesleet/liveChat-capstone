import Dashboard from './components/Dashboard'
import styles from './App.module.css'
import { GlobalProvider } from './GlobalContext'

const App = () => {
  return (
    <div className="App">
      <GlobalProvider>
        <Dashboard />
      </GlobalProvider>
    </div>
  )
}

export default App
