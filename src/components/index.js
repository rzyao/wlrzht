import Vue from 'vue'
import MyAlert from './common/alert.js'
Vue.component(MyAlert, {
    props: {
        text: {
            type: String,
            default: alert
        }
    }
})
