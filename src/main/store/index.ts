import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user'
import {useDispatch} from 'react-redux'
import logger from '@main/core/logger'

const logTracer = (store: any) => (next: any) => (action: any) => {
  logger.log('Store', 'dispatching', action)
  const result = next(action)
  logger.log('Store', 'new state', store.getState())
  return result
}

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(logTracer),
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
