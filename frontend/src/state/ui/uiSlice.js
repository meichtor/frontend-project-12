import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  chat: {
    defaultChannelId: '1',
    selectedChannelId: '1',
  }
}

const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      const id = action.payload
      state.chat.selectedChannelId = id
    }
  }
})

export const { setCurrentChannel } = uiSlice.actions

export default uiSlice.reducer