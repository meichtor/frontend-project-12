import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../routes'

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
      providesTags: ['Messages']
    }),
  }),
})

export const {
  useGetMessagesQuery,
} = messagesApi

export default messagesApi