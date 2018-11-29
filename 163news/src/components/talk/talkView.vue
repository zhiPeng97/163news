<template>
  <div class="talk">
    <div class="menu">
      <span class="recommend" :class="recActive" @click="showRec()">推荐 <span></span></span>
      <span class="attention" :class="attActive" @click="showAtt()">关注</span>
      <div class="find_user" @click="find">
        <img src="../../public/img/find_user.png" height="20">
      </div>
    </div>
    <div class="content" ref="content">
      <div>
        <div class="hot">
          <img src="../../public/img/hot_talk.png" height="15" alt="">
          <span>热门话题</span>
          <i class="icon-gt"></i>
        </div>
        <div class="rec_box" v-for="(val, index) in dyData" :key="index">
          <div class="content_box">
            <div class="user_box">
              <img :src="val.picInfo[0].url" height="20">
              <span class="user_name">
                {{val.source}}
              </span>
              <div class="focus" @click="focusFun(index)" :class="val.focus?'focusActive':''">关注</div>
            </div>
            <div class="content_text"
                 @click="details(val.picInfo[0].url, val.source, val.digest, val.title, praiseCounts[index])">
              {{val.digest}}{{val.title}}
            </div>
          </div>
          <div class="link_box"
               @click="details(val.picInfo[0].url, val.source, val.digest, val.title, praiseCounts[index])">
            <div class="link_img">
              <img :src="val.picInfo[0].url">
            </div>
            <div class="link_text">
              <span>{{val.digest}}</span>
            </div>
          </div>
          <div class="item">
            <div class="praise"
                 @click="praiseOut(index)">
              <i class="icon-praise"></i>
              <span>{{praiseCounts[index]}}</span>
            </div>
            <div class="share" @click="shareLink()">
              <img src="../../public/img/axz.png">
              <span>分享</span>
            </div>
          </div>
        </div>
        <div class="att_box">
          <div class="nullFocus" @click="login()" v-if="focusCount">
            <div class="img">
              <img src="../../public/img/night_bap.png" width="200" alt="哎呀，网页崩了">
            </div>
            <div class="placeLogin">请先登录</div>
          </div>
          <div class="focusLis">
            <div class="top" @click="hiddenFocus">我的关注</div>
            <div class="focusBox">
              <div class="myFocus" v-for="(val, index) in dyData" :key="index">
                <div v-show="val.focus">
                  <div class="img"><img :src="val.picInfo[0].url"></div>
                  <div class="userId">{{val.source}}</div>
                  <div class="synopsis">这，就是我的关注就是我的关注</div>
                  <div class="back" @click="focusBack(index)">取消关注</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Details from './details'
  import BScroll from 'better-scroll'

  const $ = require('jquery')
  export default {
    created() {
      this.axios.get('https://www.apiopen.top/journalismApi')
        .then((res) => {
          res = res.data.data.dy
          this.dyData = res
          this.focusShow = this.dyData.focus
            this.$nextTick(() => {
              this.contentScroll = new BScroll(this.$refs.content, {
                click: true
              })
            })
        })
    },
    data() {
      return {
        focusShow: [],
        focusCount: 0,
        dyData: [],
        recActive: 'active',
        attActive: '',
        praiseCounts: [645, 426, 543, 142, 973, 123, 447, 232, 529, 102, 148, 430, 123, 447, 426, 543],
        praiseShow: false,
        focusBoxShow: true,
        cancel: 0
      }
    },
    computed: {},
    methods: {
      showAtt() {
        $('.rec_box').hide()
        $('.att_box').show()
        this.recActive = ''
        this.attActive = 'active'
      },
      showRec() {
        $('.rec_box').show()
        $('.att_box').hide()
        this.recActive = 'active'
        this.attActive = ''
      },
      find() {
        this.$router.push('/search')
      },
      shareLink() {
        this.$router.push('/login')
      },
      login() {
        this.$router.push('/login')
      },
      details(img, source, diget, title, praise) {
        // val.picInfo[0].url, val.source, val.diget, val.title, praiseCounts[index]
        let pageData = {
          'userImg': img,
          'userName': source,
          'text': [diget, title],
          'praise': praise
        }
        this.$router.push({name: 'detailsView', params: pageData})
      },
      praiseOut(i) {
        this.praiseShow = !this.praiseShow
        if ($('.praise').eq(i).hasClass('praiseActive')) {
          this.praiseCounts[i]--
        } else {
          this.praiseCounts[i]++
        }
        $('.praise>span').eq(i).text(this.praiseCounts[i])
        $('.praise').eq(i).toggleClass('praiseActive')
      },
      opinion(i) {
        if (this.dyData[i].focus) {
          $('.focus').eq(i).text('已关注')
        } else {
          $('.focus').eq(i).text('关注')
        }
      },
      focusFun(i) {
        if (this.dyData[i].focus) {
          this.dyData[i].focus = !this.dyData[i].focus
        } else {
          // 使用$set方法判断this.dyData[i]里面有没有focus这个值,如果没有，就set一个 值为 true 的'focus'对象 ( 'focus': true )
          this.$set(this.dyData[i], 'focus', true)
        }
        this.opinion(i)
      },
      focusBack(i) {
        this.focusFun(i)
      },
      hiddenFocus() {
        this.focusBoxShow = !this.focusBoxShow
        if (this.focusBoxShow) {
          $('.focusBox').slideDown()
        } else {
          $('.focusBox').slideUp()
        }
      }
    },
    components: {
      Details
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .talk
    .menu
      position: relative
      padding: 18px 0
      width: 100%
      text-align: center
      font-size: 18px
      color: #717171
      .find_user
        position: relative
      .recommend
        position: relative
        margin-right: 16px
        span
          position: absolute
          display: inline-block
          right: -4px
          width: 2px
          height: 2px
          border: 2px solid #eb413d
          border-radius: 50%
      .attention
      .active
        font-weight: 600
        color: #444
      .find_user
        position: absolute
        top: 18px
        right: 16px
    .content
      position: absolute
      top: 54px
      left: 0
      bottom: 46px
      width: 100%
      overflow: hidden
      .hot
        padding: 16px
        color: #333333
        i
          float: right
          font-size: 14px
          color: #ccc
      .rec_box
        box-sizing: border-box
        padding: 0 16px
        width: 100%
        border-top: 6px solid #f5f7f9
        .content_box
          .content_text
            margin: 16px 0 36px 0
            font-size: 15px
            line-height: 20px
            color: #333333
          .user_box
            margin-top: 20px
            width: 100%
            img
              width: 24px
              border-radius: 50%
              vertical-align: center
              margin-right: 6px
              float: left
            .user_name
              font-size: 14px
              color: #333333
              line-height: 20px
            .focus
              float: right
              padding: 4px 12px
              font-size: 12px
              border: 1px solid #eeeeee
              border-radius: 10px
              color: #333
              &.focusActive
                background: #eee
        .link_box
          box-sizing: border-box
          padding: 6px 8px
          height: 62px
          background: #f5f7f9
          .link_img
            float: left
            margin-right: 10px
            img
              width: 46px
              height: 46px
          .link_text
            span
              font-size: 13px
              line-height: 13px
        .item
          display: block
          padding: 10px 20px
          height: 20px
          line-height: 20px
          font-size: 0
          .praise
            float: left
            font-size: 10px
            i
              float: left
              margin-right: 4px
              font-size: 17px
          .praiseActive
            color: #ff2c0c

          .share
            float: right
            font-size: 10px
            img
              float: left
              margin-right: 4px
              width: 18px
              height: 18px
              font-size: 10px

      .att_box
        display: none
        padding: 0 18px
        .nullFocus
          .img
            margin: 60px auto 10px
            width: 200px
            height: 200px
          .placeLogin
            margin-top: 10px
            text-align: center
            height: 46px
            line-height: 46px
            color: #aaa
        .focusLis
          .top
            margin: 20px auto
            height: 30px
            font-size: 15px
            line-height: 30px
            font-weight: 300
            text-align: center
            border-radius: 20px
            color: white
            background: orange
          .focusBox
            /*height: 250px*/
            /*overflow: auto*/
            .myFocus
              display: inline-block
              width: 33.3%
              text-align: center
              float: left
              .img
                padding-top: 14px
                img
                  width: 70px
                  height: 70px
                  border-radius: 50%
              .userId
                height: 30px
                font-size: 14px
                line-height: 30px
                color: #444
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
              .synopsis
                font-size: 12px
                font-weight: 300
                color: #bababa
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
              .back
                display: inline-block
                margin-top: 8px
                padding: 0 16px
                height: 30px
                font-size: 13px
                line-height: 30px
                color: #444
                border: 1px solid #dcdcdc
                border-radius: 17px
</style>
