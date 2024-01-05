import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './pages/router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<MantineProvider defaultColorScheme='dark'>
			<RouterProvider router={router} />
		</MantineProvider>
	</StrictMode>
)
