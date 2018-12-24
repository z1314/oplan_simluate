<template>
  <div class="header">
        <div class="l-icon-wrap"><i class="iconfont icon-orait"></i></div>
        <div class="r-icon-wrap">
          <div class="user-info">
            <span class="username">{{ userInfo }}</span>
            <i class="iconfont icon-lianxi"></i>
          </div>
          <div class="apply iconfont icon-yingyong"></div>
          <div class="service iconfont icon-lianxi"></div>
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: "wwp"
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
      height: 100%;
      width: 100%;
      background: rgba(255, 139, 97, 1);
      .l-icon-wrap {
        float: left;
      }
      .r-icon-wrap {
        width: 280px;
        height: 100%;
        float: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        div {
          font-size: 30px;
          color: #ea5506;
        }
        .user-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .username {
            width: 80px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 16px;
            text-align: right;
            margin-right: 5px;
          }
          i {
            font-size: 30px;
            color: #ea5506;
          }
        }
      }
      .top_second {
        margin-top: 12px;
        margin-right: 50px;
        .icon-lianxi {
          font-size: 30px;
          color: #ea5506;
          opacity: 1;
        }
      }
      .top_third {
        float: right;
        margin-top: 12px;
        margin-right: 20px;
        .icon-yingyong {
          font-size: 30px;
          color: #ea5506;
          opacity: 1;
        }
      }
    }
</style>

