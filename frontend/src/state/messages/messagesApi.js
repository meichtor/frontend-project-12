import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../routes'
import socket from '../../socket'

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery(
    {
      baseUrl:
        API_URL,
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

          const newMessageHandler = (message) =>
            updateCachedData((draft) => {
              console.log(message)
              draft.push(message)
            })

          socket.addEventListener('newMessage', newMessageHandler)
        }
        catch {
          console.error('cache data is not loaded')
        }
        await cacheEntryRemoved
        socket.off('newMessage')
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