import { createStore, compose, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import { thunkMiddleware } from '@rootstrap/redux-tools'

import rootReducer from 'state/reducers'

import api from '../middleware/api'

export default function configureStore(initialState, isServerSide = false) {
  const middlewares = [thunkMiddleware, api]

  const store = createStore(rootReducer(), initialState, compose(applyMiddleware(...middlewares)))

  if (isServerSide) {
    return { store }
  }

  const persistor = persistStore(store)

  return { store, persistor }
}
