<template>
  <div class="oraitVerify">
    <i
      :class="{
        iconfont: true,
        'icon-zhengque1': hint.icon == 0,
        'icon-jinggao1': hint.icon == 1
      }"
    >
    </i>
    <span>{{ hint.msg }}</span>
  </div>
</template>

<script>
export default {
  props: {
    hint: {
      type: Object
    }
  },
  data() {
    return {
      // hint: {
      //   nickname: {
      //     icon: -1,
      //     msg: ""
      //   },
      //   phone: {
      //     icon: -1,
      //     msg: ""
      //   },
      //   companyName: {
      //     icon: -1,
      //     msg: ""
      //   }
      // },
      // temp: ""
    };
  },
  methods: {
    // verifyFn(str, testObj) {
    //   switch (str) {
    //     //验证昵称
    //     case "nickname":
    //       if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(testObj)) {
    //         this.temp = "nickname";
    //         this.hint.nickname.icon = 0;
    //         this.hint.nickname.msg = "";
    //       } else {
    //         this.temp = "nickname";
    //         // this.$set(this.hint.nickname, "icon", 1);
    //         // this.$set(this.hint.nickname, "msg", "仅支持中英文输入");
    //         this.hint.nickname.icon = 1;
    //         this.hint.nickname.msg = "仅支持中英文输入";
    //         console.log(this.hint.nickname);
    //       }
    //       break;
    //     //验证手机号码
    //     case "phone":
    //       if (/^1[34578]\d{9}$/.test(testObj)) {
    //         this.temp = "phone";
    //         this.hint.phone.icon = 0;
    //         this.hint.phone.msg = "";
    //       } else {
    //         this.temp = "phone";
    //         this.hint.phone.icon = 1;
    //         this.hint.phone.msg = "请输入正确的手机号";
    //         console.log(this.hint.phone);
    //       }
    //       break;
    //     // //验证企业名称
    //     // case "companyName":
    //     //   if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(testObj)) {
    //     //     this.hint.companyName.icon = 0;
    //     //     this.hint.companyName.msg = "";
    //     //   } else {
    //     //     this.hint.companyName.icon = 1;
    //     //     this.hint.companyName.msg = "仅支持中英文输入";
    //     //   }
    //     //   break;
    //   }
    // }
  }
};
</script>
<style lang="scss" scoped>
.oraitVerify {
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-overflow: none;
  white-space: nowrap;
  .icon-jinggao1 {
    color: rgba(255, 119, 62, 1);
  }
  .icon-zhengque1 {
    color: rgba(45, 202, 147, 1);
  }
  i {
    font-size: 16px;
    vertical-align: top;
  }
  span {
    color: rgba(255, 119, 62, 1);
    margin-left: 5px;
  }
}
</style>
