import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../api'
import socket from '../../socket'
import { channelRemoved } from '../ui/uiSlice'

const channelsApi = createApi({
  reducerPath: 'channelsApi',
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
  tagTypes: ['Channels'],

  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => `/channels`,
      providesTags: ['Channels'],
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch },
      ) {
        try {
          await cacheDataLoaded

          socket.connect()

          const newChannelHandler = (channel) =>
            updateCachedData((draft) => {
              draft.push(channel)
            })

          const renameChannelHandler = (channel) =>
            updateCachedData((draft) => {
              const updatedChannel = draft.find((ch) => ch.id === channel.id)
              if (updatedChannel) {
                updatedChannel.name = channel.name
              }
            })

          const removeChannelHandler = ({ id }) => {
            updateCachedData((draft) => {
              return draft.filter(ch => ch.id !== id)
            })
            dispatch(channelRemoved(id))
          }

          socket.addEventListener('newChannel', newChannelHandler)
          socket.addEventListener('renameChannel', renameChannelHandler)
          socket.addEventListener('removeChannel', removeChannelHandler)
        }
        catch {
          console.error('cache data is not loaded')
        }
        await cacheEntryRemoved
        socket.off('newChannel')
        socket.off('removeChannel')
        socket.off('renameChannel')
        socket.disconnect()
      },
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: '/channels',
        method: 'POST',
        body: channel
      }),
    }),
    renameChannel: builder.mutation({
      query: (payload) => ({
        url: `/channels/${payload.id}`,
        method: 'PATCH',
        body: payload.channel
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
    })
  }),
})

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} = channelsApi

export default channelsApi