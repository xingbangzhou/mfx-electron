import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user'
import {useDispatch} from 'react-redux'

const logger = (store: any) => (next: any) => (action: any) => {
  console.log('dispatching', action)
  const result = next(action)
  console.log('next state', store.getState())
  return result
}

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(logger),
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
