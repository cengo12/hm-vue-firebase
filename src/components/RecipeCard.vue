<script setup>
import { useCollection } from 'vuefire';
import { computed } from 'vue';
import { recipeIngredientsRef, recipesRef } from '../firebase';
import  IngredientCard  from './IngredientCard.vue';
import { doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';

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

const deleteRecipe = async () => {
    if (confirm('Reçeteyi Silmek İstediğinize Emin Misiniz')) {
    await deleteDoc(doc(recipesRef, props.recipeId)).then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

  }
}

</script>

<template>
    <v-card hover >
        <v-card-item append-icon="mdi-delete">
            <v-card-title>{{ recipeName }}</v-card-title>
            <template v-slot:append >
                <v-btn icon @click="deleteRecipe">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-card-item>
        <v-card-text>
            <template v-for="ingredient in recipe" :key="ingredient.id">
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