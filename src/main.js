import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import Amplify from 'aws-amplify';
import AmplifyVue from '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';
import '@aws-amplify/ui-vue/styles.css';

import {
  applyPolyfills,
  defineCustomElements,
} from '@aws-amplify/ui-components/loader';

Amplify.configure(aws_exports);

applyPolyfills().then(() => {
  defineCustomElements(window);
});


const app = createApp(App).use(store).use(router).use(AmplifyVue);
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('amplify-');
app.mount('#app')


