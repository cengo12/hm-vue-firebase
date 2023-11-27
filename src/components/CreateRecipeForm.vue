<script setup>
import { productsRef } from "@/firebase";
import { useCollection } from "vuefire";
import { ref } from 'vue';
import { doc, setDoc } from "firebase/firestore";
import { recipeIngredientsRef, recipesRef } from "../firebase";


const products = useCollection(productsRef)


const selectedProduct = ref();
const quantity = ref();
const recipeName = ref();
const numberOfIngredients = ref(1)

const newRecipe = ref({
    recipe_name: "Yeni Reçete",
})
const ingredients = ref([])

const createRecipe = async () => {
    // Add a new document with a generated id
    const newRecipeRef = doc(recipesRef);

    // later...
    await setDoc(newRecipeRef, newRecipe.value);
    await setDoc(recipeIngredientsRef(newRecipeRef.id), {
        recipe_id: newRecipeRef.id,
        ingredient: "/urunler/"+selectedProduct.value.id,
        amount: quantity.value
    });
}

const selectProduct = () => {
    console.log(selectedProduct.value.id);
    ingredients.value.push({
        ingredient: selectedProduct.id,
        amount: quantity.value
    })
}

</script>

<template>
    <div>
        <v-text-field v-model="recipeName" label="Reçete Adı" variant="outlined" clearable></v-text-field>
        <ul>
            <li v-for="i in numberOfIngredients" :key="i">
                <v-select v-model="selectedProduct" :items="products" :key="products.id" @update:modelValue="selectProduct" return-object item-title="product_name" label="Ürün"
                    variant="outlined" clearable></v-select>
                <v-text-field v-model="quantity" label="Miktar" variant="outlined" clearable></v-text-field>
            </li>
        </ul>
        <v-btn @click="numberOfIngredients++">+</v-btn>
        <v-btn @click="numberOfIngredients--">-</v-btn>
        <v-btn @click="createRecipe">Reçete Oluştur</v-btn>
    </div>
</template>