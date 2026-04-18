export const API_URL = '/api/v1'

export const routes = {
  loginPath: () => [API_URL, 'login'].join('/'),
  signUpPath: () => [API_URL, 'signup'].join('/'),
  channelsPath: () => [API_URL, 'channels'].join('/'),
  messagesPath: () => [API_URL, 'messages'].join('/'),
}