import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { PersistGate } from "redux-persist/integration/react"

import favoritesReducer from "./reducers/favoritesReducer"
import App from "./components/app"

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, favoritesReducer)

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider resetCSS={true}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
