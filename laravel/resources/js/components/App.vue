<template>
    <div id="app">
        <TestApi />
    </div>
</template>

<script>
import TestApi from "./TestApi/TestApi.vue";
export default {
    name: "App",
    components: {
        TestApi,
    },
};
</script>

<style scoped>
h1 {
    color: #42b983;
}
</style>
