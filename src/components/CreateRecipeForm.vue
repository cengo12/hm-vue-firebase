<script setup>

import { productsRef } from "@/firebase";
import { useCollection } from "vuefire";
import { ref } from 'vue';
import { doc, setDoc } from "firebase/firestore";
import { recipeIngredientsRef, recipesRef, ingredientRef } from "../firebase";


const products = useCollection(productsRef)

const recipeName = ref();
const numberOfIngredients = ref(1)


const ingredients = ref([])


const createRecipe = async () => {
    const newRecipeRef = doc(recipesRef);
    await setDoc(newRecipeRef, {recipe_name: recipeName.value} );

    ingredients.value.forEach(async ingredient => {
        var myIngredientRef = ingredientRef(ingredient.product.id);
        console.log(ingredient.product.id)

        const newRecipeIngredientsRef = doc(recipeIngredientsRef(newRecipeRef.id))
        await setDoc(newRecipeIngredientsRef, {
            amount: parseInt(ingredient.amount),
            ingredient: myIngredientRef,
        });
    });

}



const selectProduct = () => {
    console.log(ingredients.value)

}

const addIngredient = () => {
    numberOfIngredients.value++;
    ingredients.value.push({ product: null, amount: null });
}

const removeIngredient = (ingredient) => {
    if (numberOfIngredients.value > 0) {
        numberOfIngredients.value--;
        ingredients.value.splice(ingredients.value.indexOf(ingredient), 1);
    }
}



</script>

<template>
    <div style="border-style: solid;">
        <v-text-field v-model="recipeName" label="Reçete Adı" variant="outlined" clearable></v-text-field>
        <v-list>
            <v-list-item v-for="(ingredient, i) in ingredients" :key="i">
                <v-select v-model="ingredient.product" :items="products" :key="products.id"
                    @update:modelValue="selectProduct" return-object item-title="product_name" item-value="id" label="Ürün"
                    variant="outlined" clearable></v-select>

                <v-text-field v-model="ingredient.amount" label="Miktar" variant="outlined" clearable></v-text-field>
                <v-btn @click="removeIngredient(ingredient)" :key="i">-</v-btn>
            </v-list-item>
        </v-list>
        <v-btn @click="addIngredient">+</v-btn>
        
        <v-btn @click="createRecipe">Reçete Oluştur</v-btn>

    </div>
</template>