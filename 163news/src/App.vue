<template>
  <div id="app">
    <router-view @nightMode="nightMode"/>
    <div class="bottom_nav">
      <router-link class="nav" to="/">
        <i class="icon icon-home"></i>
        <p>首页</p>
      </router-link>
      <router-link class="nav" to="/video">
        <i class="icon icon-video"></i>
        <p>视频</p>
      </router-link>
      <router-link class="nav" to="/talk">
        <i class="icon icon-talk"></i>
        <p>讲讲</p>
      </router-link>
      <router-link class="nav" to="/main">
        <i class="icon icon-mine"></i>
        <p>我</p>
      </router-link>
    </div>
      <router-link to="/login" class="login"></router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        nightShow: false
      }
    },
    methods: {
      nightMode() {
        console.log('a')
        this.nightShow = !this.nightShow
        if (this.nightShow) {
          document.body.setAttribute('style', 'background:#aaa')
          document.querySelector('.bottom_nav').setAttribute('style', 'background: #aaa')
        } else {
          document.body.setAttribute('style', 'background:#fff')
          document.querySelector('.bottom_nav').setAttribute('style', 'background: #fff')
        }
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  #app
    width: 100%
    min-height: 100%
    .bottom_nav
      position: fixed
      display: flex
      left: 0
      bottom: 0
      width: 100%
      height: 46px
      text-align: center
      background: #fff
      .nav
        flex: 1
        height: 46px
        font-size: 9px
        color: #666666
        &.exact-active
          color: #f91512
        .icon
          display: block
          margin: 4px 0 2px 0
          font-size: 20px
          height: 22px
          line-height: 22px
    /*.login*/
      /*position: absolute*/
      /*top: 0*/
      /*left: 0*/
      /*width: 100%*/
      /*height: 100%*/
      /*z-index: 1*/
      /*background: #fff*/
</style>
