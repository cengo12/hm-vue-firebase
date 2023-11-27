<script setup>
import { useCollection } from 'vuefire';
import { computed } from 'vue';
import { recipeIngredientsRef } from '../firebase';


const props = defineProps(['recipeId', 'recipeName']);
const recipe = useCollection(recipeIngredientsRef(props.recipeId));

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