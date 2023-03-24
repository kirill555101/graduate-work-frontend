import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import router from '@/plugins/router';
import vuetify from '@/plugins/vuetify';

import App from '@/app.vue';

describe('App.vue', () => {
  it('renders app component', () => {
    const wrapper = shallowMount(App, { router, vuetify });
    expect(wrapper.text()).toBeNull();
  });
});
