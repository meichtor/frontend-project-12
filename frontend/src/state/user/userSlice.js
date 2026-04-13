import { createSlice } from "@reduxjs/toolkit"

const localStorageUserData = JSON.parse(localStorage.getItem('user'))

const initialState = {
  token: localStorageUserData?.token || null,
  username: localStorageUserData?.username || null
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { username, token } = action.payload
      state.token = token
      state.username = username
      localStorage.setItem('user', JSON.stringify({ token, username }))
    },
    logout: (state) => {
      state.token = null
      state.username = null
      localStorage.removeItem('user')
    }
  }
})

export const { setUserData, logout } = userSlice.actions

export default userSlice.reducer