<script setup>
import { ref } from 'vue';


let isExpanded = ref(false);

const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
};

</script>

<template>
    <v-expansion-panels :class="{ expanded: isExpanded }">
        <v-expansion-panel>

            <v-expansion-panel-title @click="toggleExpanded">
                <slot name="title" />
            </v-expansion-panel-title>

            <v-expansion-panel-text>
                <slot name="content" />
            </v-expansion-panel-text>

        </v-expansion-panel>
    </v-expansion-panels>
</template>

<style scoped>
/* .v-expansion-panel-text {
    height: 50vh;
    transition: 0.4s;
} */


</style>



