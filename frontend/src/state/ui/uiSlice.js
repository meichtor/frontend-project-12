import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chat: {
    defaultChannelId: '1',
    selectedChannelId: '1',
  },
  modal: {
    isOpen: false,
    type: null,
    extra: null,
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      const id = action.payload
      state.chat.selectedChannelId = id
    },
    openModal: (state, action) => {
      const { type, extra } = action.payload
      state.modal.isOpen = true
      state.modal.type = type
      state.modal.extra = extra
    },
    closeModal: (state) => {
      state.modal.isOpen = false
      state.modal.type = null
      state.modal.extra = null
    },
    channelRemoved: (state, action) => {
      if (state.chat.selectedChannelId === action.payload) {
        state.chat.selectedChannelId = initialState.chat.defaultChannelId
      }
    },
  },
})

export const { setCurrentChannel, openModal, closeModal, channelRemoved } = uiSlice.actions

export default uiSlice.reducer
