<script setup>
import { useCollection } from 'vuefire';
import { computed } from 'vue';
import { recipeIngredientsRef } from '../firebase';
import  IngredientCard  from './IngredientCard.vue';


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
    <v-card hover >
        <v-card-item>
            <v-card-title>{{ recipeName }}</v-card-title>
        </v-card-item>
        <v-card-text>
            <template v-for="ingredient in recipe" :key="ingredient.id">
                <!-- 
                <v-list lines="one" density="compact">
                    <v-list-item>{{ 'Ürün adı: ' + ingredient.ingredient.product_name }}</v-list-item>
                    <v-list-item>{{ 'Ürün miktari: ' + ingredient.amount }}</v-list-item>
                    <v-list-item>{{ 'Ürün birim maliyeti: ' + ingredient.ingredient.product_cost }}</v-list-item>
                    <v-list-item>{{ 'Ürün maliyeti: ' + ingredient.ingredient.product_cost * ingredient.amount }}</v-list-item>
                </v-list> 
                -->
                <IngredientCard 
                :ingredientName="ingredient.ingredient.product_name" 
                :ingredientAmount="ingredient.amount" 
                :ingredientUnitCost="ingredient.ingredient.product_cost" 
                :ingredientTotalCost="ingredient.ingredient.product_cost * ingredient.amount"
                ></IngredientCard>
                <br>

            </template>
        </v-card-text>
        <div>
            Toplam Reçete Maliyeti: {{ totalCost }}
        </div>

    </v-card>
    <br>
</template>