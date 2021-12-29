<template>
  <Authenticator>
    <template v-slot="">
      <ion-app>
        <ion-router-outlet />
      </ion-app>
    </template>
  </Authenticator>
</template>

<script setup lang="ts">
import { Authenticator } from '@aws-amplify/ui-vue'
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import '@aws-amplify/ui-vue/styles.css'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)
</script>
