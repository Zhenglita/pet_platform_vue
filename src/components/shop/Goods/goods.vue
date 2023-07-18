<template>
  <div>
    <div class="goods-container">
      <div>
        <input
          type="checkbox"
          :checked="state"
          @change="upstate"
        />

        <label :for="'cb' + id">
          <img :src="image" alt="" />
        </label>
      </div>

      <div class="goods-info">
        <!-- <h6>状态:{{isok}}</h6> -->
        <h6 class="goods-title">图书：{{ title }}</h6>
        <div>
          <span class="goods-price">价格：{{ price }}</span>
        </div>
        <slot> </slot>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    // 要渲染的商品的标题
    // 子组件将要变的时候需要根据id来修改状态
    id: {
      require: true,
      type: Number
    },
    title: {
      default: '',
      type: String
    },
    price: {
      default: 0,
      type: Number
    },
    image: {
      default: '',
      type: String
    },
    state: {
      default: true,
      type: Boolean
    },
    count: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      list1: []
    }
  },
  methods: {
    upstate (e) {
      const newState = e.target.checked

      // console.log(newState)
      this.$emit('upstate', { id: this.id, newstate: newState })
    }
  },
  components: {},
  created () {}
}
</script>

<style lang="less" scoped>
.goods-container {
  display: flex;
}
</style>
