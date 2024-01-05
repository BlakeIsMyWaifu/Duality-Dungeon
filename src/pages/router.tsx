import { createBrowserRouter } from 'react-router-dom'

import Home from './Home'
import Map from './Map'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/map',
		element: <Map />
	}
])
