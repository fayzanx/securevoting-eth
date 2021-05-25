import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import allReducers from './reducers'

export const store = createStore(
    allReducers,
    {}, // default state
    compose(applyMiddleware(thunk))
)
