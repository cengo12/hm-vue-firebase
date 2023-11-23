<template>
  <div>
    <v-data-table :items="products" :headers="headers" :search="search" align-center>

      <template v-slot:top>
        <div class="d-flex align-center pa-4">
          <v-text-field v-model="search" variant="solo" append-icon="mdi-magnify" label="Arama" single-line hide-details />
          <v-btn rounded="xs" class="mx-2 white--text" prepend-icon="mdi-plus" text="Ekle" @click="addNew" />
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <template v-if="item.id === editedItem.id">
          <v-icon small class="mr-2" @click="save"> mdi-content-save </v-icon>
          <v-icon small color="red" @click="cancel"> mdi-close-circle </v-icon>
        </template>
        <template v-else>
          <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
          <v-icon small color="red" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </template>

      <template v-slot:item.product_name="{ item }">
        <v-text-field v-model="editedItem.product_name" variant="outlined" :hide-details="true" density="compact" single-line
          :autofocus="true" v-if="item.id === editedItem.id" />
        <span v-else> {{ item.product_name }} </span>
      </template>

      <template v-slot:item.product_stock="{ item }">
        <v-text-field v-model="editedItem.product_stock" variant="outlined" :hide-details="true" density="compact" single-line
          v-if="item.id === editedItem.id" />
        <span v-else> {{ item.product_stock }} </span>
      </template>

      <template v-slot:item.product_unit="{ item }">
        <v-text-field v-model="editedItem.product_unit" variant="outlined" :hide-details="true" density="compact" single-line
          v-if="item.id === editedItem.id" />
        <span v-else> {{ item.product_unit }} </span>
      </template>

      <template v-slot:item.product_cost="{ item }">
        <v-text-field v-model="editedItem.product_cost" variant="outlined" :hide-details="true" density="compact" single-line
          v-if="item.id === editedItem.id" />
        <span v-else> {{ item.product_cost }} </span>
      </template>

      <template v-slot:item.product_description="{ item }">
        <v-text-field v-model="editedItem.product_description" variant="outlined" :hide-details="true" density="compact" single-line 
          v-if="item.id === editedItem.id" />
        <span v-else > {{ item.product_description }} </span>
      </template>

    </v-data-table>
  </div>
</template>

<script setup>
import { productsRef } from '@/firebase';
import { useCollection } from "vuefire";
import { ref } from 'vue';
import { doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';

const search = ref('');
const editedIndex = ref(-1);

const editedItem = ref({
  id: '',
  product_name: '',
  product_stock: '',
  product_unit: '',
  product_cost: '',
  product_description: '',
});

const defaultItem = ref({
  product_name: 'Yeni Ürün',
  product_stock: 0,
  product_unit: '',
  product_cost: '',
  product_description: 'Lütfen Düzenleyiniz',
});

const products = useCollection(productsRef);


const headers = [
  {
    title: 'Ürün Adı',
    value: 'product_name'
  },
  {
    title: 'Stok',
    value: 'product_stock'
  },
  {
    title: 'Birim',
    value: 'product_unit'
  },
  {
    title: 'Fiyat',
    value: 'product_cost'
  },
  {
    title: 'Açıklama',
    value: 'product_description'
  },
  {
    title: 'İşlemler',
    value: 'actions'
  },
]

const editItem = (item) => {
  editedIndex.value = products.value.indexOf(item);
  editedItem.value = { ...item, id: item.id };
}

const deleteItem = async (item) => {
  if (confirm('Ürünü Silmek İstediğinize Emin Misiniz')) {
    await deleteDoc(doc(productsRef, item.id)).then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

  }
}

const cancel = () => {
  editedItem.value = Object.assign({}, defaultItem.value);
  editedIndex.value = -1;
}

const save = async () => {
  if (editedIndex.value > -1) {
    const editedItemRef = doc(productsRef, editedItem.value.id);
    await updateDoc(editedItemRef, editedItem.value).then(() => {
      console.log("Document successfully updated!");
      cancel();
    }).catch((error) => {
      console.error("Error updating document: ", error);
    });
  } else {
    cancel();
  }
}

const addNew = async () => {
  const docRef = await addDoc(productsRef, defaultItem.value);
  console.log("Document written with ID: ", docRef.id);
}


</script>

<style scoped>
input.v-field__input {
  padding: 4px;
}

td > span {
  padding: 4px;
}

</style>
