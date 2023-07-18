<template>
  <div>
      <button @click="decrease">-1</button>
      <input type="text" :value="getcount">
       <button @click="add">+1</button>
  </div>

</template>

<script>

export default {
  props: {
    getcount: {
      default: 0,
      type: Number
    },
    getid: {
      required: true,
      type: Number
    }

  },
  methods: {
    decrease () {
      this.$emit('decreasecount', this.getcount - 1)
    },
    add () {
      this.$emit('addcount', this.getcount + 1)
    }
  }
}

</script>

<style>

</style>
