<script setup>
import { doc, updateDoc } from 'firebase/firestore';
import { useCollection } from "vuefire";
import { productsRef } from "@/firebase";
import { ref } from 'vue';
import {recipeIngredientsRef} from "@/firebase";


const props = defineProps({
    'recipeId': String,
    'quantity': {
        type: Number,
        default: 1
    },
});

const recipe = useCollection(recipeIngredientsRef(props.recipeId));

const stocks = ref([]);

const updateStock = async () => {
    console.log("updateStock function called");
    stocks.value = [];
    for (let ingredient of recipe.value) {
        const editedItemRef = doc(productsRef, ingredient.ingredient.id);
        console.log("quantity: " + props.quantity)

        console.log("ürün adı: " + ingredient.ingredient.product_name)
        let oldStock = parseInt(ingredient.ingredient.product_stock);
        console.log("old stock: " + oldStock);

        let stockToDeduct = 0
        if (props.quantity > 1) {
            console.log("quantity is" + props.quantity + " and bigger than 1");
            stockToDeduct = parseInt(ingredient.amount) * props.quantity;
        } else {
            console.log("quantity is" + props.quantity + " and smaller than 1");
            stockToDeduct = parseInt(ingredient.amount);
        }
        ingredient.ingredient.product_stock = parseInt(ingredient.ingredient.product_stock) - stockToDeduct;

        console.log("new stock: " + ingredient.ingredient.product_stock);
        let newStock = parseInt(ingredient.ingredient.product_stock);

        await updateDoc(editedItemRef, ingredient.ingredient).then(() => {
            console.log("Document successfully updated!");
            console.log(ingredient.ingredient);
            stocks.value.push({
                ingredient_name: ingredient.ingredient.product_name,
                old_stock: oldStock,
                new_stock: newStock
            });
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    }
}

</script>

<template>
    <v-btn @click="updateStock">Stok Çıkışı Yap</v-btn>
    <div v-for="stock in stocks">
        <p>{{ stock.ingredient_name }} için stok güncellendi. Eski stok: {{ stock.old_stock }} Yeni stok: {{ stock.new_stock
        }}</p>
    </div>
</template>