<template>
  <transition name="searchMove">
    <div class="search">
      <div class="search_box">
        <i class="icon-lt" @click="close()"></i>
        <input type="text" placeholder="请输入关键字" :value="searchVal">
        <span><a :href="aSrc+searchVal+aSrc2">搜索</a></span>
      </div>
      <div class="content">
        <div class="top_title">热门搜索</div>
        <div v-for="(val,index) in topData" :key="index" class="ratings">
          <span v-bind="topNum(val.title)" :class="'top'+(index+1)" class="top">{{index+1}}.&nbsp;</span>
          <span class="title" @click="searchFun(index)">{{val.msg}}</span>
          <img v-show="val.hot" src="../public/img/hot_talk.png" width="20">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'search',
    created() {
    },
    data() {
      return {
        styles: '',
        topData: [
          {
            'num': 1,
            'msg': '金庸逝世',
            'hot': true
          },
          {
            'num': 2,
            'msg': '央视发文悼念李咏',
            'hot': true
          },
          {
            'num': 3,
            'msg': '里皮亚洲杯后离任'
          },
          {
            'num': 4,
            'msg': '男孩撞限高杆身亡'
          },
          {
            'num': 5,
            'msg': '李亚鹏欠债四千万'
          },
          {
            'num': 5,
            'msg': '阙清子工作室辟谣'
          },
          {
            'num': 5,
            'msg': '五险一金黑名单'
          }
        ],
        searchVal: '',
        aSrc: 'https://www.baidu.com/from=844b/s?word=',
        aSrc2: '&sasub=gh_icon20181104&ts=4082481&t_kt=0&ie=utf-8&fm_kl=021394be2f&rsv_iqid=0478981445&rsv_t=6a4bQu9h%252Fmj6Jf7chGD52EUpdfyfFpcbDqqRx9WBL9jh%252FgGHVEas4cg8%252BA&sa=ib&ms=1&rsv_pq=0478981445&rsv_sug4=1676&ss=010&tj=1&inputT=745'
      }
    },
    methods: {
      topNum(val) {
      },
      close() {
        setTimeout(() => {
          this.$router.go(-1)
        }, 100)
      },
      searchFun(i) {
        this.searchVal = this.topData[i].msg
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .search
    position: fixed
    width: 100%
    height: 100%
    background: rgb(255, 255, 255)
    z-index: 1000
    transition: all 0.2s linear
    &.searchMove-enter
      opacity: 0.3
      transform-origin: center center
      transform: translateX(100px) rotateZ(30deg)
    &.searchMove-leave-to
      transform: translateX(100%)
    .search_box
      display: flex
      margin: 0 auto
      padding: 16px
      i
        flex: 0 0 22px
        font-size: 20px
        font-weight: 600
        line-height: 30px
        margin-right: 10px
        color: #646464
      input
        flex: 1 0
        box-sizing: border-box
        padding: 6px 12px 6px 36px
        height: 30px
        min-width: 160px
        border: 2px solid #edeff3
        border-radius: 20px
        box-shadow: none
        outline: none
      /*color: #edeff3*/
      span
        margin-left: 10px
        font-size: 16px
        line-height: 27px
        color: #646464
    .content
      padding: 20px 14px
      .top_title, .ratings
        font-size: 15px
        line-height: 36px
        font-weight: 300
        border-bottom: 1px solid #e0e0e0
        color: #c2c2c2
        &.ratings
          padding: 0 10px
          .top
            font-weight: 500
          .top1
            color: red
          .top2
            color: #ff831c
          .top3
            color: #ffb50a
          .title
            color: #2f2f2f
          img
            height: 16px
            width: 16px

</style>
