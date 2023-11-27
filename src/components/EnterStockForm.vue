<template>
  <div>
    <h2></h2>
    <v-row>
      <v-col cols="6">
        <div>

          <v-select v-model="selectedProduct" :items="products" return-object item-title="product_name" label="Ürün"
            variant="outlined" clearable></v-select>
        </div>
      </v-col>
      <v-col cols="2">
        <v-text-field v-model="quantity" label="Miktar" variant="outlined" clearable></v-text-field>
      </v-col>
      <v-col cols="4" class="pb-8">
        <v-btn @click="addSelected" rounded="xs" class="white--text" style="height: 100%;" prepend-icon="mdi-plus"
          text="Ekle" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import {productsRef} from "@/firebase";
import { useCollection } from "vuefire";
import { ref } from 'vue';
import { doc, updateDoc } from 'firebase/firestore';


const products = useCollection(productsRef)



const selectedProduct = ref();
const quantity = ref();

const addSelected = async () => {

  const editedItemRef = doc(productsRef, selectedProduct.value.id);
  console.log("old stock: " + selectedProduct.value.product_stock);

  selectedProduct.value.product_stock = parseInt(selectedProduct.value.product_stock) + parseInt(quantity.value);
  console.log("new stock: " + selectedProduct.value.product_stock);

  await updateDoc(editedItemRef, selectedProduct.value).then(() => {
    console.log("Document successfully updated!");
    console.log(selectedProduct.value);
  }).catch((error) => {
    console.error("Error updating document: ", error);
  });
}


</script>

<style>
h2 {
  margin-bottom: 20px;
}
</style>
