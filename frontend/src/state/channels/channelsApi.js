import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../routes'

const channelsApi = createApi({
  reducerPath: 'channelsApi',
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
  tagTypes: ['Channels'],

  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => `/channels`,
      providesTags: ['Channels']
    }),
  }),
})

export const {
  useGetChannelsQuery,
} = channelsApi

export default channelsApi