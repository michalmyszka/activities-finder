<script setup lang="ts">
import { IonButton, IonContent, IonInput, IonItem, IonPage } from '@ionic/vue';
import { computed, ref } from 'vue';
import AuthService from '../services/AuthService';

const email = ref('')
const password = ref('')

const userInputCorrect = computed(
    () => AuthService.isUsernameValid(email.value) && AuthService.isPasswordValid(password.value)
)

function singUp() {
    AuthService.singUp({
        username: email.value,
        password: password.value,
        email: email.value
    })
}
</script>

<template>
    <ion-page>
        <ion-content>
            <ion-item>
                <ion-input :placeholder="$t('email')" v-model="email"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input :placeholder="$t('password')" v-model="password"></ion-input>
            </ion-item>
            <ion-button
                type="submit"
                expand="block"
                :disabled="!userInputCorrect"
                @click="singUp"
            >{{ $t('signUp') }}</ion-button>
        </ion-content>
    </ion-page>
</template>