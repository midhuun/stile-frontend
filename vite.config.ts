import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Fix for older Node runtimes where structuredClone is missing during build
if (typeof (globalThis as any).structuredClone !== 'function') {
  ;(globalThis as any).structuredClone = (val: any) =>
    val === undefined ? val : JSON.parse(JSON.stringify(val))
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
