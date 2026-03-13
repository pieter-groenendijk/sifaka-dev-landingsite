import { mount } from 'svelte';
import App from './presentation/App.svelte';
import './presentation/app.css';

mount(App, {
  target: document.getElementById('app')!,
});