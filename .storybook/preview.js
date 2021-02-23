import { addDecorator } from '@storybook/vue';
import vuetify from './vuetify_storybook';
import vuetifyConfig from '../src/plugins/vuetify'
import i18n from '../src/plugins/i18n.js';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

addDecorator(() => ({
  vuetify: vuetifyConfig,
  template: `
    <v-app>
      <v-main>
        <v-container fluid >
          <story/>
        </v-container>
      </v-main>
    </v-app>
    `,
    i18n
}))
