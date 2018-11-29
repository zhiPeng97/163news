<template>
  <transition name="detMove">
    <div class="details">
      <div class="top" v-show="!showLogin">
        <div class="icon-lt" @click="close()"></div>
        <div class="user_box">
          <img :src="pageData.userImg" style="width:32px; height:32px; border-radius: 50%">
          <div class="userMsg">
            <div class="userName">{{pageData.userName}}</div>
            <div class="times">17分钟前&nbsp;·&nbsp;[讲讲]&nbsp;栏目小编</div>
          </div>
        </div>
        <div class="right">
          <span class="att" @click="foucusFun()" :class="showFocus?'focusActive':''">{{focusval}}</span>
          <img src="../../public/img/b1w.png" width="22">
        </div>
      </div>

      <div class="conScroll" ref="scroll">
        <div>
          <div>
            <div class="content">
              <div class="text">
                <span>{{pageData.text[0]}}</span>
                <span>{{pageData.text[1]}}</span>
                <span style="font-size: 0">·</span>
                <span style="font-size: 0">·</span>
                <h3 style="font-size: 20px;font-weight: 600;color:#f90;">马云发文悼念金庸：若无先生 不知是否会有阿里</h3>
                <span>只因一个“侠”字，结缘半生。</span>
                <span>先生其文也大，其人也真。我爱先生之文，爱它侠肝义胆，光明涤荡；我爱先生之人，爱他儒雅敦厚，赤子之心。初见先生，我如话痨，一人絮叨三小时，先生只笑着听，此情此景，如在眼前；此情此景，再难重现！</span>
                <span>若无先生，不知是否还会有阿里。</span>
                <span>要有，也一定不会是今天这样，几万人一起痴痴颠颠――创业，便要做别人做不得之事，侠之大者，为国为民；做人，便要至情至性笑傲江湖；朋友，便要肝胆相照至死不渝……</span>
                <span>只因先生这样写这样说，我们便这样信了，便这样做了。</span>
                <span>一群有情有义之人一起做一件有意义之事，“让天下没有难做的生意”。一言既出，此后经年，去挑战，去抗争，浑身是伤，屡败屡战，忍别人不能忍之委屈，成别人不愿成之事，唯不愿忍江湖不平正气不彰，少年心，英雄梦，惟愿我们能如先生书中侠客，以肝胆豪情行走于这天地之间。</span>
                <span>了却侠骨柔情，快意江湖恩仇。</span>
                <span>先生含笑，已然远去。</span>
                <span>先生赐字“天行”于我，学生终身铭记；“信不能弃”的告诫，一刻不敢忘；郭靖，黄蓉，行颠，逍遥子，奔雷手，苏荃，语嫣……满满十五部书的花名，托先生之福，常在思过崖行走，在摩天崖争辩，在光明顶见客……</span>
                <span>正直，情义，担当，洒脱……我们努力活出先生教会我们的模样。</span>
                <span>惟愿，家国情、侠客梦、浩然气，融入阿里血液，化为百年精神……变成先生留在这个世界的另一种遗产，走完102年。</span>
                <span>望先生，九泉之下首肯。</span>
                <span>一人江湖，江湖一人。</span>
                <span>侠者已逝，来者当追，江湖路远，侠义长存！</span>
              </div>
              <div class="imgs">
                <span>
                  <viewer>
                    <img src="../../public/img/jinyong01.jpg">
                    <img src="../../public/img/jinyong02.jpg">
                    <img src="../../public/img/jinyong03.jpg">
                    <img src="../../public/img/jinyong04.jpg">
                    <img src="../../public/img/jinyong05.jpg">
                    <img src="../../public/img/jinyong06.jpg">
                  </viewer>
                </span>
              </div>
              <div class="content_bottom">
                <div class="ask">
                  <div class="icon"></div>
                  <span class="text">金庸去世，你最爱他那部作品？</span>
                </div>
                <div class="other">
                  <div @click="clickUp(!show)" :class="show?'redColor':'like'">
                    <i class="icon-praise"></i>
                    <span>{{praiseCount}}</span>
                  </div>
                  <div :class="showDown?'redColor':'trample'" @click="down()">
                    <i class="icon-trample"></i>
                    <span>{{trampleCount}}</span>
                  </div>
                  <div class="comment" @click="commentFocus">
                    <i class="icon-message"></i>
                    <span>评论</span>
                  </div>
                  <div class="share" @click="showShareFun">
                    <i class="icon-share"></i>
                    <span>分享</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="comment">
              <div class="comment_top">
                <span class="comCount">{{commentCount}}条评论</span>
                <span class="hottest">最热</span>
                <span class="splice">|</span>
                <span class="newest ">最新</span>
              </div>
              <div class="showComment">
                <div v-for="(val, index) in commentData" :key="index" class="comFor">
                  <img src="../../public/img/aur.png" width="20">
                  <div class="comBox">
                    <div class="user">
                      <span class="userID">{{val.user}}</span>
                      <div class="comPraise_box" style="display: inline-block"
                           @click="clickPraise(index,val.praiseCount)">
                        <span class="comPraise">{{val.praise}}</span>
                        <i class="icon-praise"></i>
                      </div>
                    </div>
                    <div class="text">{{val.text}}</div>
                    <div class="timeBox">
                      <span class="time">{{val.time}}</span>
                      <span class="reply" @click="replyMsg(index)">回复</span>
                    </div>
                    <div class="replyBox" v-for="(rep, num) in val.reply" :key="num">
                      <div class="replyBottom">
                        <span class="replyId">{{rep.replyId}}：{{rep.replyText}}</span>
                        <span class="del" @click="delFun(index,num)" v-show="val.del">删除</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="writeComment">
        <input ref="focusInput" type="text" placeholder="写评论" v-model="val" @keyup.alt.enter="send">
        <span @click="send()">发送</span>
      </div>
      <Share v-show="showShare" class="myShare" @closeShare="showShareFun" @showLoginBox="showLoginBox"></Share>
      <div class="showShare_bg" v-show="showShare" @click="showShareFun"></div>
      <Login v-show="showLogin" class="goLink" @closeLogin="showLoginBox"></Login>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import Share from '../share/shareView'
  import Login from '../login/login2'

  const $ = require('jquery')
  export default {
    props: ['focus'],
    created() {
      this.pageData = this.$route.params
      // console.log(this.pageData)
      this.commentCount = this.commentData.length
      this.$nextTick(() => {
        this.conScroll = new BScroll(this.$refs.scroll, {
          click: true
        })
      })
    },
    data() {
      return {
        imgs: [
          '../../public/img/jinyong01.jpg',
          '../../public/img/jinyong02.jpg',
          '../../public/img/jinyong03.jpg',
          '../../public/img/jinyong04.jpg',
          '../../public/img/jinyong05.jpg',
          '../../public/img/jinyong06.jpg'
        ],
        showLogin: false,
        showReply: false,
        showShare: false,
        showFocus: false,
        praiseCount: 2412,
        trampleCount: 2,
        show: false,
        showDown: false,
        replys: false,
        focusval: '关注',
        commentData: [
          {
            'user': 'LOL了解一下',
            'text': '马云好文采，歌己颂人！牛逼！',
            'praise': 3209,
            'time': '1小时前',
            'reply': [{'replyId': '来自火星的我', 'replyText': '马老师文采当然不错'}, {'replyId': '天外飞人', 'replyText': '老马了解一下'}]
          },
          {
            'user': '全场最佳IG',
            'text': '宝可不淘，信不能弃！',
            'praise': 429,
            'time': '3小时前',
            'reply': [{'replyId': '中国男神', 'replyText': '是男人就来kan我999dao'}, {'replyId': '域外天魔', 'replyText': '兽人永不为奴'}]
          }
        ],
        replyNum: 0,
        userId: '风清扬',
        val: '',
        praiseNum: 0,
        talkData: {
          tname: '网易号科技站',
          imgUser: '../../public/img/al4.png',
          time: '17分钟前&nbsp;·&nbsp;[讲讲]&nbsp;栏目科技小编',
          content: '马云发文悼念金庸先生，称“若无金庸先生，不知是否还会有阿里”。',
          content2: '字里行间，情真意切，感人肺腑。'
        },
        pageText: {}
      }
    },
    watch: {
      commentData() {
        // return this.commentData[].del
      }
    },
    methods: {
      showShareFun() {
        this.showShare = !this.showShare
        if (this.showShare) {
          $('.myShare').slideDown()
        } else {
          $('.myShare').slideUp()
        }
      },
      showLoginBox() {
        this.showLogin = !this.showLogin
      },
      close() {
        this.$router.go(-1)
      },
      clickUp() {
        this.show = !this.show
        if (this.show) {
          this.praiseCount++
        } else {
          this.praiseCount--
        }
        if (this.showDown) {
          this.trampleCount--
          this.showDown = !this.showDown
        }
      },
      down() {
        this.showDown = !this.showDown
        if (this.show) {
          this.praiseCount--
          this.show = !this.show
        }
        if (this.showDown) {
          this.trampleCount++
        } else {
          this.trampleCount--
        }
      },
      send() {
        if (this.val != null) {
          if (this.replys) {
            this.commentData[this.replyNum].reply.push({'replyId': this.userId, 'replyText': this.val})
            this.replys = false
          } else {
            this.commentData.push({
              'user': this.userId,
              'text': this.val,
              'praise': 0,
              'time': '刚刚',
              'reply': [],
              'del': true
            })
          }
        }
        this.val = ''
      },
      clickPraise(i) {
        if ($('.comPraise_box').eq(i).hasClass('comPraiseColor')) {
          $('.comPraise_box').eq(i).removeClass('comPraiseColor')
          this.commentData[i].praise--
        } else {
          $('.comPraise_box').eq(i).addClass('comPraiseColor')
          this.commentData[i].praise++
        }
      },
      replyMsg(i) {
        this.replys = true
        this.replyNum = i
        this.$refs.focusInput.focus()
      },
      commentFocus() {
        this.$refs.focusInput.focus()
      },
      foucusFun() {
        this.showFocus = !this.showFocus
        if (this.showFocus) {
          this.focusval = '已关注'
        } else {
          this.focusval = '关注'
        }
      },
      delFun(i, n) {
        this.showReply = !this.showReply
        $('.replyBox').eq(i).children('.del').eq(n).css('display', 'none')
        this.commentData[i].reply[n].del = false
        // console.log(this.commentData[i].reply[n].del)
      }
    },
    components: {
      Share,
      Login
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .details
    position: fixed
    width: 100%
    height: 100%
    background: #fff
    z-index: 100
    transition: all 0.2s linear
    &.detMove-enter
      opacity: 0.5
      transform: translateX(100px)
    &.detMove-leave-to
      transform: translateY(100%)
    .myShare
      position: fixed
      width: 100%
      bottom: 0
      background: #fff
      z-index: 100
    .showShare_bg
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      z-index: 10
      background: rgba(0, 0, 0, 0.3)
    .top
      margin-top: 16px
      display: flex
      padding: 0 10px
      height: 36px
      .icon-lt
        flex: 0 0 24px
        margin-right: 6px
        display: inline-block
        font-size: 24px
        font-weight: 500
        line-height: 36px
        vertical-align: top
      .user_box
        flex: 1
        font-size: 0
        img
          display: inline-block
          margin-right: 4px
        .userMsg
          display: inline-block
          /*margin-left: 4px*/
          .userName
            width: 100%
            font-size: 14px
            line-height: 24px
            vertical-align: top
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
          .times
            width: 100%
            font-size: 10px
            font-weight: 300
            color: #bbb
            vertical-align: top
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
      .right
        flex: 0 0 80px
        text-align: center
        .att
          display: inline-block
          float: left
          margin-top: 4px
          padding: 2px 2px
          height: 18px
          width: 46px
          font-size: 13px
          line-height: 19px
          border: 1px solid #ccc
          border-radius: 12px
          &.focusActive
            background: #ccc
            font-size: 12px
        img
          float: right
          margin-right: 6px
          margin-top: 6px
    .conScroll
      position: fixed
      top: 62px
      bottom: 45px
      width: 100%
      overflow: hidden
      .content
        padding: 10px 12px 0
        border-bottom: 6px solid #f6f6f6
        .text
          font-size: 16px
          line-height: 26px
          span
            display: block
            text-indent: 2em
        .imgs
          margin-top: 16px
          span
            margin: 1px
          img
            width: 109px
            height: 90px
        .content_bottom
          margin: 0 30px
          padding: 14px 0
          .ask
            border-bottom: 1px solid #e6e6e6
            padding: 10px 0
            .icon
              display: inline-block
              width: 4px
              height: 4px
              border: 4px solid #4ba2dc
              border-radius: 50%
            .text
              font-size: 13px
              line-height: 16px
              vertical-align: top
              color: #4ba2dc
          .other
            display: flex
            margin-top: 10px
            height: 20px
            font-size: 14px
            & > div
              flex: 1
              text-align: center
              color: #595959
            .like, .trample
              span
                font-size: 8px
                vertical-align: top
            .redColor
              color: red
    .comment
      padding: 0 10px
      margin-bottom: 40px
      .comment_top
        display: flex
        margin: 26px auto
        font-size: 16px
        .comCount
          flex: 1
          font-weight: 600
        .hottest
          font-size: 16px
          font-weight: 500
        .splice
          margin: 0 10px
          color: #ccc
        .newest
          color: #ccc

      .showComment
        .comFor
          display: flex
          img
            flex: 0 0 26px
            width: 26px
            height: 26px
            vertical-align: center
          .comBox
            flex: 1
            margin-bottom: 30px
            .user
              display: flex
              .userID
                flex: 1
                margin-left: 4px
                font-size: 14px
                line-height: 30px
                vertical-align: top
              .comPraise
                margin-right: 1px
                font-size: 8px
                line-height: 30px
              i
                font-size: 18px
                line-height: 30px
              .comPraiseColor
                color: red
            .text
              padding: 10px 20px 20px 10px
            .timeBox
              margin-bottom: 10px
              .time
                font-size: 12px
                color: #ccc
              .reply
                font-size: 12px
                color: #444
            .replyBox
              padding: 6px 12px
              font-size: 14px
              line-height: 20px
              background: #f4f8fb
              .replyBottom
    .writeComment
      position: fixed
      display: flex
      width: 100%
      left: 0
      bottom: 8px
      input
        flex: 1
        margin-top: 1px
        margin-left: 6px
        padding: 5px 0 5px 10px
        height: 16px
        border: 1px solid #ddd
        border-radius: 14px
        box-shadow: none
        outline: none
        outline-color: invert
      span
        flex: 0 0 50px
        height: 30px
        font-size: 16px
        color: #999
        line-height: 30px
        text-align: center
    Login
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(0, 0, 0, 0.7)
</style>
