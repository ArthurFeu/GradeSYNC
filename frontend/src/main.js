
import { registerPlugins } from '@/plugins'
import './plugins/axios'
import App from './App.vue'
import { createApp } from 'vue'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

registerPlugins(app)

app.use(Toast, {
	position: POSITION.TOP_CENTER,
	timeout: 2500,
});

app.mount('#app')
