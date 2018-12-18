<template>
  <div class="oraitVerify">
    <i
      :class="{
        iconfont: true,
        'icon-zhengque1': success == 0,
        'icon-jinggao1': success == 1
      }"
    >
    </i>
    <span>{{ inputHint }}</span>
  </div>
</template>

<script>
export default {
  props: {
    success: {
      type: Number
    },
    inputHint: {
      type: String
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.oraitVerify {
  width: 100%;
  height: 100%;
  .icon-jinggao1 {
    color: rgba(255, 119, 62, 1);
  }
  .icon-zhengque1 {
    color: rgba(45, 202, 147, 1);
  }
  i {
    font-size: 16px;
    vertical-align: middle;
  }
  span {
    color: rgba(255, 119, 62, 1);
    margin-left: 5px;
  }
}
</style>
