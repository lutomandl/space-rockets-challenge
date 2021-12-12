import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { createStore } from "redux"
import { Provider } from "react-redux"

import favoritesReducer from "./reducers/favoritesReducer"
import App from "./components/app"

const store = createStore(
  favoritesReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider resetCSS={true}>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
