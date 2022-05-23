import { createStore } from 'vuex'
import { auth } from './auth/auth.js';

export default createStore({
  
  modules: {
    auth
  }
})
