<script setup>
import {  ref } from 'vue';

const props = defineProps(['ingredientName', 'ingredientAmount', 'ingredientUnitCost', 'ingredientTotalCost']);
</script>

<template>
    
        <v-list density="compact"  :border=true class="rounded-xl" >
                    <v-list-item>{{ 'Ürün adı: ' + props.ingredientName }}</v-list-item>
                    <v-list-item>{{ 'Ürün miktari: ' + props.ingredientAmount }}</v-list-item>
                    <v-list-item>{{ 'Ürün birim maliyeti: ' + props.ingredientUnitCost }}</v-list-item>
                    <v-list-item>{{ 'Ürün maliyeti: ' + props.ingredientTotalCost }}</v-list-item>
                </v-list>
    
</template>