import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../api'
import socket from '../../socket'

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery(
    {
      baseUrl: API_URL,
      prepareHeaders: (headers, { getState }) => {
        const { token } = getState().user
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
        return headers
      },
    }),
  tagTypes: ['Messages'],

  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => `/messages`,
      providesTags: ['Messages'],
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded

          socket.connect()

          const newMessageHandler = (message) =>
            updateCachedData((draft) => {
              draft.push(message)
            })

          const removeChannelHandler = ({ id }) =>
            updateCachedData((draft) => {
              return draft.filter((msg) => msg.channelId !== id)
            })

          socket.addEventListener('newMessage', newMessageHandler)
          socket.addEventListener('removeChannel', removeChannelHandler)
        }
        catch {
          console.error('cache data is not loaded')
        }
        await cacheEntryRemoved
        socket.off('newMessage')
        socket.off('removeChannel')
        socket.disconnect()
      },
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: '/messages',
        method: 'POST',
        body: message
      }),
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi

export default messagesApi