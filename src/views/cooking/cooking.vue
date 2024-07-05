<template>
  <div>
    <!-- 菜单主体区域 -->
    <div class="cooking-container">
      <div
        class="item"
        v-for="(item, index) in menu"
        :key="index"
        @click="openDrawer(item)"
      >
        <cooking-image :data="item"></cooking-image>
      </div>
    </div>
    <!-- 抽屉详情区域 -->
    <a-drawer
      width="640"
      placement="right"
      :closable="true"
      :visible="visible"
      @close="onClose"
    >
      <h2>{{ currentItem.name }}</h2>
      <img
        v-if="currentItem.name"
        :src="require(`../../assets/cooking/${currentItem.name}.jpg`)"
        width="300"
      />
      <h4>准备食材<a-icon @click="copyNeeds" type="copy" theme="twoTone" /></h4>
      <div class="need">
        <a-checkbox-group
          v-model="needValue"
          :options="currentItem.need"
          style="width: 100%"
        >
          <a-row>
            <a-col :span="6">
              <a-checkbox
                v-for="(item, index) in currentItem.need"
                :key="index"
                :value="item"
                >{{ item }}</a-checkbox
              >
            </a-col>
          </a-row>
        </a-checkbox-group>
      </div>
      <h4>todo</h4>
      <div class="todo">
        <ul>
          <li v-for="(item, index) in currentItem.todo" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
      <h4>备注</h4>
      <div>{{ currentItem.remarks }}</div>
    </a-drawer>
  </div>
</template>
<script>
import menu from "./menu/index.js";
import CookingImage from "@/components/CookingImage";
export default {
  name: "Cooking",
  components: {
    CookingImage,
  },
  data() {
    return {
      currentItem: {},
      menu: [],
      visible: false,
      needValue: [],
    };
  },
  created() {
    this.menu = menu;
  },
  mounted() {},
  methods: {
    openDrawer(item) {
      this.currentItem = item;
      this.needValue = [];
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    copyNeeds() {
      if (this.needValue.length == 0) {
        this.$message.warning("请勾选需要购买的食材及配料");
      } else {
        const url = this.needValue.join(",");
        let oInput = document.createElement("input");
        oInput.value = url;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象;
        document.execCommand("Copy"); // 执行浏览器复制命令
        this.$message.success('复制成功')
        oInput.remove();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.cooking-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  .item {
    margin-bottom: 20px;
    margin-right: 30px;
  }
}

h4 {
  margin-top: 30px;
}
</style>
