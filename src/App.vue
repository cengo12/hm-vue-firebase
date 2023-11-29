<script setup>

import { RouterView } from 'vue-router'
import { ref } from 'vue'

const drawer = ref(false)
</script>

<template>
  <v-app >

    <v-navigation-drawer v-model="drawer" >
    </v-navigation-drawer>

    <v-app-bar >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>HAS MAMUL</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>

  </v-app>
</template>

<style scoped>

</style>
