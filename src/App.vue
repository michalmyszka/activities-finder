<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
</script>

<template>
  <!-- This style is here as StatusBar.setOverlaysWebView({ overlay: false }) is currently not supported on iOS. -->
  <IonApp style="margin-top: 20px">
    <IonRouterOutlet />
  </IonApp>
</template>
