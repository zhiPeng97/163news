<template>
  <div id="home" ref="home">
    <div class="head">
      <img src="../../public/img/home_icon.png" height="20">
      <!--<img src="../../public/img/home_search_icon.png" height="16">-->
      <input type="text" @click="searchBox()">
      <div class="input_bg" @click="searchBox()">
        <transition-group name="fade">
          <div v-for="(val, index) in ratings" :key="index" class="ratings_text" v-show="currentIndex == index ">
            <img src="../../public/img/home_search_icon.png" width="12" style="margin-top: -2px" alt="">
            <span>{{val.msg}}</span>
          </div>
        </transition-group>
      </div>
      <img src="../../public/img/home_live_icon.png" height="26">
    </div>
    <div class="img">
      <img src="../../public/img/night_asr.png" @click="coloseColumn" width="11"/>
    </div>
    <div class="nav_top" ref="nav">
      <ul ref="ul">
        <li class="nav_box" ref="nav_box" v-for="(val, count) in taxons" :key="count" @click="res(val.num, count)"
            :class="navBoxNum === count? 'listActive': ''">
        <span>
          {{val.text}}
        </span>
        </li>
      </ul>
    </div>
    <div class="scroll" ref="scroll">
      <div>
        <div class="content">
          <!-- 这里要设置data_out拿到的数据默认为toutiao的数据的话，需要在created里面拿-->
          <a class="box" v-for="(val,index) in data_out" :key="index" :href="val.link"
             :class="val.picInfo.length>=1?'boxHeight':''">
            <div class="content_top">
              <div :class="val.picInfo.length>=1?'title':'title_block'">{{val.title}}</div>
              <div class="inblock" v-if="val.picInfo.length >= 1">
                <img :src="val.picInfo.length>0?val.picInfo[0].url:''">
              </div>
            </div>
            <div class="bottom">
              <div class="source">{{val.source}}</div>
              <div class="tcount">跟帖{{val.tcount}}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <transition name="colMove">
      <div class="columnBox" v-show="showColumn">
        <div class="columnTop">
          <h2>所有栏目</h2>
          <span @click="coloseColumn">×</span>
        </div>
        <div class="MycolumnBox">
          <div class="title">
            <span class="left">我的栏目</span>
            <span class="right" @click="delCol">{{compile}}</span>
          </div>
          <div class="myColumn">
            <div class="myColumnList" v-for="(val, index) in taxons" ref="myCol"
                 :key="index">
              <span>
                <i @click="delColumnsFun(index, val.num)" v-show="delColumns">×</i>
                <b @click="showRes(val.num, index)">{{val.text}}</b>
              </span>
            </div>
          </div>
        </div>
        <div class="MorecolumnBox">
          <div class="title">
            <span class="left">更多栏目</span>
          </div>
          <div class="myColumn">
            <div class="myColumnList" v-for="(val, index) in MoreColumns" @click="addColumns(index)" ref="moreCol"
                 :key="index">
              <span>+{{val.text}}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  // const $ = require('jquery')
  export default {
    created() {
      this.axios.get('https://www.apiopen.top/journalismApi')
        .then(res => {
          // console.log(res)
          res = res.data.data
          // console.log(res)
          this.datas = res
          this.data_out = res.toutiao
          this.$nextTick(() => {
            this.ratingScroll = new BScroll(this.$refs.scroll, {
              click: true
            })
          })
        })
    },
    mounted() {
      this.$nextTick(() => {
        setInterval(() => {
          this.currentIndex++
          if (this.currentIndex === this.ratings.length) {
            this.currentIndex = 0
          }
        }, 2000)
      })
    },
    data() {
      return {
        navBoxNum: 0,
        compile: '编辑',
        delColumns: false,
        showColumn: false,
        MoreColumns: [
          {'text': '薄荷'}, {'text': '财经'}, {'text': '热点'}, {'text': '跟帖'}, {'text': '航空'}, {'text': '漫画'}, {'text': '彩票'}, {'text': 'CBA'}, {'text': '亲子'}, {'text': '教育'}, {'text': '数码'}, {'text': '手机'}, {'text': '艺术'}, {'text': '星座'}, {'text': '京东'}, {'text': '天猫'}, {'text': '萌宠'}, {'text': '佛学'}, {'text': '双创'}, {'text': '电脑'}, {'text': 'NBA'}, {'text': '搞笑'}, {'text': '淘宝'}, {'text': '游戏'}, {'text': '房产'}, {'text': '图片'}, {'text': '历史'}, {'text': '音乐'}
        ],
        datas: {},
        taxons: [
          {
            'num': 'toutiao',
            'text': '头条'
          },
          {
            'num': 'dy',
            'text': '推荐'
          },
          {
            'num': 'tech',
            'text': '科技'
          },
          {
            'num': 'war',
            'text': '军事'
          },
          {
            'num': 'money',
            'text': '财经'
          },
          {
            'num': 'auto',
            'text': '汽车'
          },
          {
            'num': 'sports',
            'text': '体育'
          },
          {
            'num': 'ent',
            'text': '娱乐'
          }
        ],
        // 在这里不能直接设置 res.data.data.toutiao 只能是设置data里面有的数据：this.taxons.
        // 如果要使用该数据/方法，应该到create(){}周期里调用
        data_out: [],
        imgCount: 0,
        topData: [],
        currentIndex: 0,
        ratings: [
          {
            'num': 1,
            'msg': '金庸逝世'
          },
          {
            'num': 2,
            'msg': '里皮亚洲杯后离任'
          },
          {
            'num': 3,
            'msg': '央视发文悼念李咏'
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
        ]
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        vm._nav_boxWidth()
      })
    },
    watch: {
      navBoxNum(newNum, oldNum) {
        console.log(newNum)
        return newNum
      }
    },
    methods: {
      res(val, i) {
        this.data_out = this.datas[val]
        // console.log(i)
        this.navBoxNum = i
        // this.$refs.nav_box[i].style.color = 're
        this.navMove(val, i)
      },
      showRes(val, i) {
        console.log(i)
        this.coloseColumn()
        this.res(val, i)
        this.navMove(val, i)
      },
      navMove(val, i) {
        var le = this.$refs.nav_box[i].offsetLeft
        var leftX = -(le - 140)
        let num = this.taxons.length - i
        this.$refs.ul.style['transition'] = `all .75s linear`
        if (num >= 3 && i > 1) {
          this.$refs.ul.style['transform'] = `translateX(${leftX}px)`
        }
      },
      top_height() {
        this.$refs.nav_top.style = {'height': '96px'}
        // console.log('a')
      },
      _nav_boxWidth() {
        let navListWidth = 0 // 父盒子的最初宽度默认为 0
        // 循环被子盒子 v-for循环 的数组
        for (var k = 0; k < this.taxons.length; k++) {
          if (this.taxons[k].text) {
            let m = 0 // 由于子盒子 v-for循环的数组 taxons 插入新数据，v-for循环出的新子盒子还没有刷新出来，没办法获取到新数据对应的子盒子的宽度，所以应该抓取上一个子盒子的宽度，当只有一个盒子的时候，直接抓取到第一个盒子的宽度
            if (k > 1) {
              m = k - 1
            }
            if (k === 0) {
              m = 0
            }
            // 拿到上一个盒子的宽度
            let navWidth = this.$refs.nav_box[m].offsetWidth
            // 每循环一个盒子，叠加盒子的宽度，for循环结束后能得出父盒子的最终宽度：navListWidth （父盒子的宽度等于所有子盒子的宽度相加）
            navListWidth = navListWidth + navWidth
          }
        }
        this.$refs.ul.style.width = navListWidth + 'px'
        this.$nextTick(() => {
          if (!this.navScroll) {
            this.navScroll = new BScroll(this.$refs.nav, {
              scrollX: true,
              click: true
            })
          } else {
            this.navScroll.finishPullUp()
            this.navScroll.refresh()
          }
        })
        // console.log(navListWidth)
        // console.log(this.$refs.ul.style.width)
      },
      searchBox() {
        this.$router.push('/search')
      },
      coloseColumn() {
        this.showColumn = !this.showColumn
      },
      addColumns(i) {
        this.taxons.push({'num': this.MoreColumns[i].num, 'text': this.MoreColumns[i].text})
        this.$refs.moreCol[i].setAttribute('style', 'display:none')
        // 当增加一个新闻类别后，重新计算父盒子的宽度并刷新 better-scroll
        this._nav_boxWidth()
      },
      delCol() {
        this.delColumns = !this.delColumns
        if (this.delColumns) {
          this.compile = '完成'
        } else {
          this.compile = '编辑'
        }
      },
      delColumnsFun(i, num) {
        this.MoreColumns.push({'num': this.taxons[i].num, 'text': this.taxons[i].text})
        this.$refs.myCol[i].setAttribute('style', 'display:none')
        this.$refs.nav_box[i].setAttribute('style', 'display:none')
        // 当删除一个新闻类别后，重新计算父盒子的宽度并刷新 better-scroll
        this._nav_boxWidth()
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  #home
    width: 100%
    height: 100%
    a:active
      -webkit-tap-highlight-color: transparent
    .head
      overflow: auto
      display: flex
      padding: 0 12px
      height: 46px
      text-align: center
      background: #e22829
      img
        flex: 0 0
        margin-top: 10px
        vertical-align: middle
        &:first-child
          margin-top: 14px
      input
        flex: 1 0 auto
        box-sizing: border-box
        margin: 6px 14px
        padding: 8px 10px
        height: 34px
        /*width: 150px*/
        box-shadow: none
        border: 0
        outline: none
        border-radius: 36px
        font-size: 16px
        color: #fff
        background: #ec5557
      .input_bg
        display: block
        position: absolute
        top: 15px
        left: 50%
        margin-left: -70px
        height: 16px
        min-width: 100px
        font-size: 14px
        font-weight: 100
        text-align: left
        color: #fff
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        .ratings_text
          position: absolute
          line-height: 18px
          &.fade-enter-active, &.fade-leave-active
            transition: all 0.5s
          &.fade-enter
            transform: translateY(100%)
          &.fade-leave-to
            transform: translateY(-100%)
      .img
        display: inline-block
        /*margin-top: 14px*/
        margin-top: -2px
        /*margin-right: 10px*/
        float: right
        height: 40px
        width: 40px
        line-height: 48px
        text-align: center
        z-index: 1000
    .img
      box-sizing: border-box
      float: right
      height: 40px
      width: 40px
      padding: 14px 14px
      img
        vertical-align: center
    .nav_top
      float: left
      position: absolute
      /* 如果有内外边距边框，可能会撑开盒子，影响后面的布局，设置box-sizing: border-box可以解决问题 */
      box-sizing: border-box
      top: 46px
      left: 0
      right: 40px
      width: 90%
      font-size: 16px
      line-height: 42px
      /*border-bottom: 1px solid #edeff3*/
      color: #7f7f7f
      overflow: hidden
      ul
        height: 42px
        li
          display: inline-block
          float: left
          width: 70px
          line-height: 40px
          text-align: center
          &.listActive
            font-weight: 500
            color: black
            border-bottom: 2px solid #e22829
    .scroll
      position: absolute
      top: 86px
      left: 0
      width: 100%
      bottom: 48px
      overflow: hidden
      .content
        .box
          display: block
          padding: 14px 12px
          position: relative
          /*height: 80px*/
          border-bottom: 1px solid #edeff3
          &.boxHeight
            height: 80px
          .content_top
            box-sizing: border-box
            display: flex
            width: 100%
            .title
              display: inline-block
              line-height: 24px
              font-size: 16px
              margin-right: 130px
            /*当文本溢出的时候，设置盒子高度或者宽度会导致文本不能撑开盒子，直接溢出到外面*/
            .inblock
              display: inline-block
              margin: 2px 0 0 20px
              position: absolute
              right: 14px
              top: 10px
              img
                width: 130px
                height: 82px
            .title_block
              /*width: 100%*/
              display: block
              width: 100%
            .bloc
              img
                display: inline-block
                float: left
                width: 80px
              &.title
                display: block
              img
                float: left
                width: 132px
      .bottom
        margin-top: 10px
        font-size: 12px
        color: #b4b4b4
        .source
          display: inline-block
        .tcount
          display: inline-block
          float: right
        img
          width: 132px
          height: 78px
    .columnBox
      position: fixed
      top: 0
      bottom: 0
      left: 0
      width: 100%
      background: #fff
      z-index: 100000
      transition: all 0.2s linear
      &.colMove-enter
        width: 70%
        height: 70%
        transform: translateY(-140px) translateX(60%)
      &.colMove-leave-to
        transform: translateY(-100%) translateX(100%)
      .columnTop
        margin-bottom: 20px
        padding-top: 10px
        height: 40px
        line-height: 40px
        font-weight: 600
        font-size: 19px
        text-align: center
        color: #393939
        /*margin-bottom: 4px*/
        span
          position: absolute
          top: 10px
          right: 20px
          font-weight: 300
          font-size: 30px
      .MycolumnBox, .MorecolumnBox
        display: inline-block
        width: 100%
        margin-bottom: 30px
        /*padding: 20px*/
        .title
          box-sizing: border-box
          padding: 0 10px 0 30px
          height: 30px
          width: 100%
          font-size: 15px
          /*vertical-align: center*/
          /*line-height: 30px*/
          .left
            float: left
            font-weight: 600
            line-height: 30px
            font-size: 16px
          .right
            box-sizing: border-box
            width: 60px
            float: right
            font-weight: 500
            line-height: 14px
            padding: 6px 14px
            border: 1px solid #de0817
            border-radius: 14px
            color: #de0817
        .myColumn
          /*margin-top: 10px*/
          width: 100%
          /*text-align: center*/
          .myColumnList
            color: #666
            margin-top: 10px
            width: 25%
            height: 36px
            box-sizing: border-box
            display: inline-block
            text-align: center
            span
              display: inline-block
              width: 78px
              padding: 6px 0
              border: 1px solid #eee
              border-radius: 14px
              overflow: hidden

</style>
