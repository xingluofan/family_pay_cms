<template>
  <div class="cooking-image">
    <img :src="require(`../assets/cooking/${data.name}.jpg`)" alt="" />
    <div class="name">{{data.name}}</div>
  </div>
</template>

<script>
export default {
  name: "CookingImage",
  props: {
    data: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.cooking-image {
  width: 300px;
  height: 225px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 10px;
  cursor: pointer;
  > img {
    width: 100%;
    height: 100%;
    transition: all 0.5s;
  }
  .name {
    position: absolute;
    width: 100%;
    top: calc(50% - 13px);
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 26px;
  }
  &:hover {
    > img {
      transform: scale(1.5);
    }
  }
}
</style>
