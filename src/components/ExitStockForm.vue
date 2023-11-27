<script setup>
import { recipesRef } from "@/firebase";
import { useCollection } from "vuefire";
import { ref } from 'vue';
import RecipeCard from "@/components/RecipeCard.vue";
import ExitStockButton from "./ExitStockButton.vue";


const recipes = useCollection(recipesRef)
const selectedRecipe = ref();
const quantity = ref();




</script>


<template>
    <div>
        <v-select v-model="selectedRecipe" :items="recipes" return-object item-title="recipe_name" label="Reçete"
            variant="outlined" clearable></v-select>
    </div>

    <template v-if="selectedRecipe && 'id' in selectedRecipe">
        <RecipeCard :key="selectedRecipe.id" :recipeId="selectedRecipe.id" :recipeName="selectedRecipe.recipe_name" />
        <v-text-field v-model="quantity" label="Miktar" variant="outlined" clearable></v-text-field>
        <ExitStockButton :key="selectedRecipe.id" :recipeId="selectedRecipe.id" :quantity="quantity" />
    </template>

</template>