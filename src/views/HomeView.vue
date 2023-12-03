<script setup>

import EnterStockForm from '@/components/EnterStockForm.vue';
import ExitStockForm from '@/components/ExitStockForm.vue';
import ExpansionPanel from '../components/ExpansionPanel.vue';

</script>


<template>
  <v-container class="h-auto">
    <v-row align="start">
      <v-col cols="12" xs="12" sm="12" md="6" lg="5" xl="5" xxl="5">
        <ExpansionPanel>
          <template #title>
            Stok Giriş
          </template>
          <template #content>
            <EnterStockForm />
          </template>
        </ExpansionPanel>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="5" xl="5" xxl="5">
        <ExpansionPanel>
          <template #title>
            Stok Çıkış
          </template>
          <template #content>
            <ExitStockForm />
          </template>
        </ExpansionPanel>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="12" lg="2" xl="2" xxl="2">
        <div>
          <RouterLink to="/urunler" v-slot="{ href, navigate }">
            <v-btn :href="href" @click="navigate" class='router-button' rounded="xs">
              Ürünler
            </v-btn>
          </RouterLink>

          <RouterLink to="/receteler" v-slot="{ href, navigate }">
            <v-btn :href="href" @click="navigate" class='router-button' rounded="xs">
              Reçeteler
            </v-btn>
          </RouterLink>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* .router-button {
  width: 100%;
  height: 40px;
}

.mycontainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.mycontainer>* {
  flex-grow: 0;
  flex-shrink: 1;
}

.v-expansion-panel,
.v-btn {
  margin-bottom: 1rem;
} */
</style>