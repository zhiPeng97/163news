<template>
  <div class="shre">
    <div class="myshare">
      <div>
        <div class="share_link">
          <div class="share_box">
            <div class="LinkImg"><img src="../../public/img/bf9.png" @click="Login" width="70"></div>
            <div class="LinkID">生成卡片</div>
          </div>
          <div class="share_box">
            <div class="LinkImg"><img src="../../public/img/bfh.png" @click="Login" width="70"></div>
            <div class="LinkID">微信</div>
          </div>
          <div class="share_box">
            <div class="LinkImg"><img src="../../public/img/bfi.png" @click="Login" width="70"></div>
            <div class="LinkID">微信朋友圈</div>
          </div>
          <div class="share_box">
            <div class="LinkImg"><img src="../../public/img/bfa.png" @click="Login" width="70"></div>
            <div class="LinkID">QQ好友</div>
          </div>
          <div class="share_box">
            <div class="LinkImg"><img src="../../public/img/bfb.png" @click="Login" width="70"></div>
            <div class="LinkID">QQ空间</div>
          </div>
          <div class="share_box">
            <div class="LinkImg"><img src="../../public/img/bfg.png" @click="Login" width="70"></div>
            <div class="LinkID">新浪微博</div>
          </div>
          <div class="share_box">
            <div class="LinkImg"><img src="../../public/img/bf5.png" @click="Login" width="70"></div>
            <div class="LinkID">大神好友</div>
          </div>
          <div class="share_box">
            <div class="LinkImg"><img src="../../public/img/bf6.png" @click="Login" width="70"></div>
            <div class="LinkID">大神圈子</div>
          </div>
        </div>
      </div>
    </div>
    <div class="share_bottom" @click="$emit('closeShare')">
      取消
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      Login() {
        this.$emit('showLoginBox')
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .shre
    /*height: 252px*/
    .share_link
      background: #f8f8f8
      height: 212px
      padding: 20px 20px
      .share_box
        box-sizing: border-box
        display: inline-block
        margin: 10px 0
        width: 25%
        height: 86px
        float: left
        text-align: center
        font-size: 14px
        img
          width: 60px
    .share_bottom
      height: 50px
      width: 100%
      font-size: 16px
      font-weight: 600
      line-height: 50px
      text-align: center
      background: #fff
</style>
