<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();
</script>

<template>
    <br />

    <template v-for="route in router.options.routes" :key="route.path">
        <v-list-item nav :to="route.path" :title="route.name"></v-list-item>
    </template>
</template>