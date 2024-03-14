import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                main: "#28464b",
                second: "#326771",
                warning: "#ef3e36",
                error: "#D91E36",
                white: "#e6e6e6",
                grey: "#a8a8a8",
                grey_l:"#ececec",
                black:"#0c0c0c",
                dark:"5a5a5a",
                success:"42d9cb"
            }
        }
    }
});
