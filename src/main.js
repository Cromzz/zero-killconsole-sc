import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import Overlay from './Overlay.svelte'

const params = new URLSearchParams(window.location.search);
const windowType = params.get('window');

const targetComponent = windowType === 'overlay' ? Overlay : App;

const app = mount(targetComponent, {
  target: document.getElementById('app'),
})

export default app
