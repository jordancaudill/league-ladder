import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './frontend/assets/main.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

import App from './frontend/App.vue'
import router from './frontend/router'

/* add icons to the library */
library.add(faCircleNotch)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
