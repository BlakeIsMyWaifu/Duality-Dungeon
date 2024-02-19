import { createRouter } from '@swan-io/chicane'
import { match } from 'ts-pattern'

import Pause from '~/components/Pause'

import Combat from './Combat'
import Home from './Home'
import Map from './Map'

export const Router = createRouter({
	home: '/',
	map: '/map',
	combat: '/combat',
	event: '/event',
	shop: '/shop'
})

export default function App() {
	const route = Router.useRoute(['home', 'map', 'combat'])

	return match(route)
		.with({ name: 'home' }, () => <Home />)
		.with({ name: 'map' }, () => <Pause page={Map} />)
		.with({ name: 'combat' }, () => <Pause page={Combat} />)
		.otherwise(() => null)
}
