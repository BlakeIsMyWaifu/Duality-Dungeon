import { createBrowserRouter } from 'react-router-dom'

import Combat from './Combat'
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
	},
	{
		path: '/combat',
		element: <Combat />
	}
])
