// load vue and vuex instance
import Vue from 'vue'
import store from '@/store'
import axios from 'axios'
// load vuex i18n module
import vuexI18n from 'vuex-i18n'

// IMPORTANT NOTE:
// The default format for the plugin is in es2015, if you do not use a transpiler
// such as babel) or for use in server side rendering (such as nuxt)
// the umd version should be loaded like this
// import vuexI18n from 'vuex-i18n/dist/vuex-i18n.umd.js';

// initialize the vuex store using the vuex module. note that you can change the
// name of the module if you wish

// initialize the internationalization plugin on the vue instance. note that
// the store must be passed to the plugin. the plugin will then generate some
// helper functions for components (i.e. this.$i18n.set, this.$t) and on the vue
// instance (i.e. Vue.i18n.set).
Vue.use(vuexI18n.plugin, store, {
  moduleName: 'i18n',
  onTranslationNotFound: (locale, key) => {
	  return new Promise((resolve, reject) => {
      axios
        .get('/api/translations/async', { locale: locale, key: key })
        .then(result => { resolve(result.data) })
        .catch(result => { reject(result); })
    })
  }
})

// please note that you must specify the name of the vuex module if it is
// different from i18n. i.e. Vue.use(vuexI18n.plugin, store, {moduleName: 'myName'})

// add some translations (could also be loaded from a separate file)
// note that it is possible to use placeholders. translations can also be
// structured as object trees and will automatically be flattened by the the
// plugin
const translationsEn = {}

// translations can be kept in separate files for each language
// i.e. resources/i18n/de.json.
const translationsDe = {}

// add translations directly to the application
Vue.i18n.add('en', translationsEn)
Vue.i18n.add('de', translationsDe)

// set the start locale to use
Vue.i18n.set('en')
