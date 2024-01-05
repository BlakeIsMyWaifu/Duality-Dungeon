import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// eslint-disable-next-line @typescript-eslint/require-await
export default defineConfig(async () => ({
	plugins: [react()],
	clearScreen: false,
	server: {
		port: 1420,
		strictPort: true,
		watch: {
			ignored: ['**/src-tauri/**']
		}
	}
}))
