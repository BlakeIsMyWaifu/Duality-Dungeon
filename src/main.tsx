import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import Mantine from '~/components/Mantine'
import { router } from '~/pages/router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<Mantine>
			<RouterProvider router={router} />
		</Mantine>
	</StrictMode>
)
