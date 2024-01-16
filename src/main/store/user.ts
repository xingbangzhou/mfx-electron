import {createSlice} from '@reduxjs/toolkit'

const defautlUserState = {
  id: 0,
  name: '业务用户',
  avatar: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState: defautlUserState,
  reducers: {
    setId(state, action: {payload: number}) {
      state.id = action.payload
    },
    setName(state, action: {payload: string}) {
      state.name = action.payload
    },
    setAvatar(state, action: {payload: string}) {
      state.avatar = action.payload
    },
  },
})

const {reducer: userReducer, actions: userActions} = userSlice

export const {setId, setName, setAvatar} = userActions

export default userReducer
