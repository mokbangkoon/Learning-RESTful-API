!
<template>
  <div>{{ check }}</div>
</template>
<script>
export default {
  name: "helloMan",
  components: {},
  data() {
    return {
      check: "a",
    };
  },
  mounted() {
    console.log("안녕");
  },
  methods: {},
};
</script>
<style lang="" scoped></style>
