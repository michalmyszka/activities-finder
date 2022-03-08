<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue';
import { IonBackButton, IonButton, IonContent, IonInput, IonItem, IonPage } from '@ionic/vue';
import { computed, ref } from 'vue';
import AuthService from '../services/AuthService';
import ErrorService from '../services/ErrorService';

const email = ref('')
const password = ref('')

const userInputCorrect = computed(
    () => AuthService.isUsernameValid(email.value) && AuthService.isPasswordValid(password.value)
)

async function logIn() {
    try {
        await AuthService.logIn({
            username: email.value,
            password: password.value
        })
    } catch (e) {
        ErrorService.handleError(e)
    }
}
</script>

<template>
    <ion-page>
        <app-toolbar>
            <template #title>{{ $t('login') }}</template>
            <template #start-buttons>
                <ion-back-button></ion-back-button>
            </template>
        </app-toolbar>
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
                @click="logIn"
            >{{ $t('login') }}</ion-button>
            <div class="ion-text-center">
                {{ $t('noAccount') }}
                <a href="/signup">{{ $t('signUp') }}</a>
            </div>
        </ion-content>
    </ion-page>
</template>