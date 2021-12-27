<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { defineComponent } from 'vue'
import '@aws-amplify/ui-vue/styles.css'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  },

  setup() {
    Amplify.configure(awsconfig)
  },
})
</script>
