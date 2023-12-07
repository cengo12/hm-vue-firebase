<script setup>
import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const auth = useFirebaseAuth();
const email = ref('');
const password = ref('');

const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
    });
}

const login = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}


</script>

<template>
    <v-text-field
        v-model="email"
        label="Email"
        outlined
        dense
    ></v-text-field>
    <v-text-field
        v-model="password"
        label="Password"
        outlined
        dense
    ></v-text-field>
    <v-btn
        color="primary"
        @click="register"
    >Register</v-btn>
    <v-btn
        color="primary"
        @click="login"
    >Login</v-btn>
</template>