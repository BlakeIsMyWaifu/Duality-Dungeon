import path from 'node:path'

import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// eslint-disable-next-line @typescript-eslint/require-await
export default defineConfig(async () => ({
	plugins: [react(), eslintPlugin()],
	clearScreen: false,
	server: {
		port: 1420,
		strictPort: true,
		watch: {
			ignored: ['**/src-tauri/**']
		}
	},
	resolve: {
		alias: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
			'~': path.resolve(__dirname, './src')
		}
	}
}))
