import { addDecorator } from '@storybook/vue';
import vuetify from './vuetify_storybook';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

addDecorator(() => ({
  vuetify,
  template: `
    <v-app>
      <v-main>
        <v-container fluid >
          <story/>
        </v-container>
      </v-main>
    </v-app>
    `,
}));
