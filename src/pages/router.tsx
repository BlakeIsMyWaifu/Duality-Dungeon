import { createRouter } from '@swan-io/chicane'
import { match } from 'ts-pattern'

import Combat from './Combat'
import Home from './Home'
import Map from './Map'

export const Router = createRouter({
	Home: '/',
	Map: '/map',
	Combat: '/combat'
})

export default function App() {
	const route = Router.useRoute(['Home', 'Map', 'Combat'])

	return match(route)
		.with({ name: 'Home' }, () => <Home />)
		.with({ name: 'Map' }, () => <Map />)
		.with({ name: 'Combat' }, () => <Combat />)
		.otherwise(() => <p>No route found</p>)
}
