// plugins/vue-google-maps.js
import VueGoogleMaps from '@fawmi/vue-google-maps'

export default {
    install(app) {
        app.use(VueGoogleMaps, {
            load: {
                key: 'AIzaSyCqeDMZ3EMF5NKGTZjFcAmsc18Vfq45_Xo',
            },
        })
    },
}
