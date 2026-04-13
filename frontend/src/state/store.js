import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
import uiReducer from './ui/uiSlice.js'
import channelsApi from './channels/channelsApi.js'
import messagesApi from './messages/messagesApi.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare()
    .concat(channelsApi.middleware, messagesApi.middleware)
})

export default store