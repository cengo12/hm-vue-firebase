<script setup>
import { recipesRef } from '@/firebase'
import { useCollection } from 'vuefire';
import RecipeCard from '@/components/RecipeCard.vue';
import CreateRecipeForm from '../components/CreateRecipeForm.vue';


const recipes = useCollection(recipesRef);


const logValue = () => {
  // const bridgeRef = collection(db, 'receteler', recipes.value[0].id, 'recete_urunler');
  // const items = useCollection(bridgeRef);
  // console.log(items);
  console.log(recipes)

}

</script>

<template>
  <div>
    <h1>Reçeteler</h1>
    <v-btn @click="logValue"></v-btn>
    <CreateRecipeForm />

    <div v-for="recipe in recipes" :key="recipe.id">
      <RecipeCard :recipeId="recipe.id" :recipeName="recipe.recipe_name" />
    </div>

  </div>
</template>
  

  
  