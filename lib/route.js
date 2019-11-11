import { Route as ServerRoute } from 'react-router'
import { Route as BrowserRoute } from 'react-router-dom'
import isServer from './isServer'

const Route = isServer ? ServerRoute : BrowserRoute

export default Route
