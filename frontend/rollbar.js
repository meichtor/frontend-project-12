import Rollbar from 'rollbar'

const initRollbar = () => {
  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
    environment: import.meta.env.MODE || 'development',
    captureUncaught: true,
    captureUnhandledRejections: true,
  }

  const rollbar = new Rollbar(rollbarConfig)

  return rollbar
}

export default initRollbar
