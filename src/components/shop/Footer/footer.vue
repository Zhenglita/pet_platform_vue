<template>
  <div>
      <input type="checkbox" :checked="getfullstate" @change="fullchange">
      <p>合计：{{sum}}</p>
      <button @click="getprice()">结算被选中的商品数量总和({{choosecount}})</button>
  </div>
</template>

<script>
export default {
  props: {
    sum: {
      default: 0,
      type: Number
    },
    getfullstate: {
      default: true,
      type: Boolean
    },
    choosecount: {
      default: 0,
      type: Number
    }
  },
  methods: {
    getprice () {
      this.$emit('getsumprice')
    },
    fullchange (e) {
      this.$emit('fullchange', e.target.checked)
    }

  }

}
</script>

<style>

</style>
