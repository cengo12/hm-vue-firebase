<script setup>
import { useCollection, useFirestore } from 'vuefire';
import { collection } from 'firebase/firestore';
import { computed } from 'vue';


const props = defineProps(['recipeId', 'recipeName'])
const db = useFirestore();

const recipe = useCollection(collection(db, 'receteler', props.recipeId, 'recete_urunler'));

const totalCost = computed(() => {
    let cost = 0;
    if (recipe.value) {
        for (let ingredient of recipe.value) {
            cost += ingredient.ingredient.product_cost * ingredient.amount;
        }
    }
    return cost;
});

</script>

<template>
    <v-card variant="tonal">
        <v-card-item>
            <v-card-title>{{ recipeName }}</v-card-title>
        </v-card-item>
        <v-card-text>
            <template v-for="ingredient in recipe" :key="ingredient.id">
                <ul>
                    <li>{{ 'urun adi: ' + ingredient.ingredient.product_name }}</li>
                    <li>{{ 'urun miktari: ' + ingredient.amount }}</li>
                    <li>{{ 'urun birim maliyeti: ' + ingredient.ingredient.product_cost }}</li>
                    <li>{{ 'urun maliyeti: ' + ingredient.ingredient.product_cost * ingredient.amount }}</li>
                </ul>
                <br>
            </template>
        </v-card-text>
        <div>
            Toplam Reçete Maliyeti: {{ totalCost }}
        </div>

    </v-card>
    <br>
</template>