import '~/utils/wdyr'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import Mantine from '~/components/Mantine'
import App from '~/pages/router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<Mantine>
			<App />
		</Mantine>
	</StrictMode>
)
