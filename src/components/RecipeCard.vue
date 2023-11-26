<script setup>
import { useCollection, useFirestore } from 'vuefire';
import { collection } from 'firebase/firestore';


const props = defineProps(['recipeId', 'recipeName'])
const db = useFirestore();
const recipe = useCollection(collection(db, 'receteler', props.recipeId, 'recete_urunler'));


</script>

<template>
    <v-card variant="tonal">
        <v-card-item>
            <v-card-title>{{ recipeName }}</v-card-title>
        </v-card-item>
        <v-card-text>
            <div v-for="ingredient in recipe" :key="ingredient.id" >
                <ul>
                    <li>{{ 'urun adi: ' + ingredient.ingredient.product_name  }}</li>
                    <li>{{ 'urun miktari: ' + ingredient.amount }}</li>
                    <li>{{ 'urun maliyeti: ' + ingredient.ingredient.product_cost * ingredient.amount }}</li>
                </ul>
                <br>
                <br>
            </div>
        </v-card-text>
    </v-card>
    <br>
</template>