import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter() },
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) => filename.includes('node_modules') ? undefined : { }
	},
	preprocess: [mdsvex({ 
		extensions: ['.svx', '.md'],
		layout: {
			_: path.resolve("./src/lib/layouts/default/default.svelte"),
		}
	})],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
