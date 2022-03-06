<script setup lang="ts">
import { IonButton, IonContent, IonInput, IonItem, IonPage } from '@ionic/vue';
import { computed, ref } from 'vue';
import AuthService from '../services/AuthService';

const username = ref('')
const password = ref('')

const userInputCorrect = computed(
    () => AuthService.isUsernameValid(username.value) && AuthService.isPasswordValid(password.value)
)

function logIn() {
    AuthService.logIn({
        username: username.value,
        password: password.value
    })
}
</script>

<template>
    <ion-page>
        <ion-content>
            <ion-item>
                <ion-input :placeholder="$t('username')" v-model="username"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input :placeholder="$t('password')" v-model="password"></ion-input>
            </ion-item>
            <ion-button
                type="submit"
                expand="block"
                :disabled="!userInputCorrect"
                @click="logIn"
            >{{ $t('login') }}</ion-button>
        </ion-content>
    </ion-page>
</template>