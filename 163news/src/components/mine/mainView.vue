<template>
  <div class="main" ref="main">
    <div class="main_box">
      <div class="top">
        <div class="box left" @click="nightModeFun">
          <img src="../../public/img/daytime_mode.png" width="16" v-show="nightMode"/>
          <img src="../../public/img/night_mode.png" width="16" v-show="!nightMode"/>
          <span>{{nightModeText}}</span>
        </div>
        <!-- :class类名操作这里需要大括号-->
        <div class="box right" :class="{signActive:signIn}" @click="signInFun">
          <img src="../../public/img/beo.png"/>
          <span>{{signInText}}</span>
        </div>
      </div>
      <div class="main_login" v-if="!LoginStar">
        <div class="login_link">
          <div class="sj">
            <img src="../../public/img/bed.png" alt="">
          </div>
          <div class="wb">
            <img src="../../public/img/bef.png" alt="">
          </div>
          <div class="wx">
            <img src="../../public/img/beg.png" alt="">
          </div>
          <div class="qq">
            <img src="../../public/img/bee.png" alt="">
          </div>
          <div class="xm">
            <img src="../../public/img/bec.png" alt="">
          </div>
        </div>
        <div class="login_box" @click="showLogin()">
          登陆/注册
        </div>
      </div>
      <div class="userBox" v-if="LoginStar" @click="personalFun()">
        <div class="userImg">
          <img :src="user[0].userImg" width="78" height="78">
        </div>
        <div class="userMsg">
          <div class="userName">{{user[0].userName}}</div>
          <div class="userFocus">{{user[0].focus}} &nbsp; 关注 &nbsp;&nbsp; {{user[0].beFocused}} &nbsp; 被关注</div>
          <div class="userTitle">{{user[0].userTitle}}</div>
        </div>
        <div class="right"><i class="icon-gt"></i></div>
      </div>
      <div class="function_box">
        <div class="content follow">
          <i class="icon-message"></i>
          <p>跟帖</p>
        </div>
        <div class="content collect">
          <i class="icon-collect"></i>
          <p>收藏</p>
        </div>
        <div class="content history">
          <i class="icon-history"></i>
          <p>历史</p>
        </div>
      </div>
      <!-- 分割线 -->
      <div class="split"></div>
      <div class="mine-box">
        <div class="mine_msg">
          <b>我的信息</b>
          <span>评论/通知
          <i class="icon-gt"></i>
        </span>
        </div>
        <div class="mine_buy">
          <b>我的已购</b>
          <span>购买的课程/直播
          <i class="icon-gt"></i>
        </span>
        </div>
      </div>
      <!-- 分割线 -->
      <div class="split"></div>
      <div class="money_box">
        <div class="gold_task">
          <b>金币任务</b>
          <span>
          <i class="icon-gt"></i>
        </span>
        </div>
        <div class="gold_mall">
          <b>金币商城</b>
          <span>
          <i class="red">嘿!&nbsp;你的500金币,&nbsp;在这里</i>
          <i class="icon-gt"></i></span>
        </div>
        <div class="js_store">
          <b>京东特供</b>
          <span>新人领188红包
          <i class="icon-gt"></i>
        </span>
        </div>
        <div class="my_wallet">
          <b>我的钱包</b>
          <span>
            <i class="icon-gt"></i>
          </span>
        </div>
      </div>
      <!-- 分割线 -->
      <div class="split"></div>
      <div class="other_box">
        <div class="free">
          <b>免流量看新闻</b>
          <span>
          <i class="icon-gt"></i>
        </span>
        </div>
        <div class="scan">
          <b>扫一扫</b>
          <span>
          <i class="icon-gt"></i>
        </span>
        </div>
        <div class="set">
          <b>设置</b>
          <span>
          <i class="icon-gt"></i>
        </span>
        </div>
      </div>
    </div>
    <!--<Login @close="close_login" class="close_login"></Login>-->
    <Login v-show="show" class="goLink" @closeLogin="closeLoginBox(LoginStar)" @LoginStarFun="LoginStarFun"></Login>

    <personal v-if="showPersonal" :user="user" @LoginOut="LoginOut"></personal>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Login from '../login/login2'
  import personal from './personalView'
  import src from '../../public/img/user_img.png'

  export default {
    created() {
      this.$nextTick(() => {
        this.ratingScroll = new BScroll(this.$refs.main, {
          click: true
        })
      })
    },
    data() {
      return {
        signIn: false,
        signInText: '签到',
        nightMode: false,
        nightModeText: '夜间',
        show: false,
        LoginStar: false,
        showPersonal: false,
        // 引用本地图片需要使用到 require， 或者在export default(){} 的上面 import src from '图片路径' 然后再在data(){} 里面使用用import定义的 src 图片路径
        // userImg: require('../../public/img/user_img.png'),
        user: [
          {'userName': '风清扬',
            'focus': 0,
            'beFocused': 0,
            'userImg': src,
            'userTitle': '跟帖局副科长'
          }
        ]
      }
    },
    methods: {
      showLogin() { // 显示登陆页面
        this.show = !this.show
        // this.$router.push('/login')
      },
      closeLoginBox(LoginStar) { // 关闭登陆页面
        this.show = !this.show
      },
      LoginStarFun() { // 登陆状态
        this.LoginStar = !this.LoginStar
        this.show = !this.show
      },
      nightModeFun() { // 夜间模式
        this.$emit('nightMode')
        this.nightMode = !this.nightMode
        if (this.nightMode) {
          this.nightModeText = '日间'
          document.querySelectorAll('.split')
          for (var i = 0; i < document.querySelectorAll('.split').length; i++) {
            document.querySelectorAll('.split')[i].setAttribute('style', 'background:#aaa')
          }
        } else {
          this.nightModeText = '夜间'
          for (var k = 0; k < document.querySelectorAll('.split').length; k++) {
            document.querySelectorAll('.split')[k].setAttribute('style', 'background:#f5f7f9')
          }
        }
      },
      signInFun() { // 签到
        if (this.LoginStar) {
          this.signIn = !this.signIn
          if (this.signIn) {
            this.signInText = '已签'
          } else {
            this.signInText = '签到'
          }
        } else {
          this.showLogin()
        }
      },
      personalFun() { // 个人主页
        this.showPersonal = !this.showPersonal
      },
      LoginOut() {
        this.showPersonal = !this.showPersonal
        this.LoginStar = !this.LoginStar
      }
    },
    components: {
      Login,
      personal
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .main
    /*position: absolute*/
    /*top: 0*/
    /*left: 0*/
    /*bottom: 0*/
    /*width: 100%*/
    margin-bottom: 46px
    overflow: hidden
    .goLink
      position: fixed
      left: 0
      top: 0
      bottom: 0
      width: 100%
    .top
      padding: 20px 18px 0 18px
      height: 30px
      font-weight: 300
      .box
        box-sizing: border-box
        display: inline-block
        float: left
        padding: 8px 12px
        height: 34px
        border: 1px solid #eeeeee
        border-radius: 28px
        vertical-align: top
        span
          height: 16px
          font-size: 14px
          line-height: 17px
          vertical-align: top
          color: #333333
        img
          height: 14px
          width: 14px
          margin-top: -3px
      .right
        float: right
        &.signActive
          background: #eee
    .main_login
      padding: 24px 34px 0 34px
      text-align: center
      .login_link
        margin-bottom: 20px
        display: flex
        height: 44px
        .sj, .wb, .wx, .qq, .xm
          flex: 1 auto
        img
          flex: 1 auto
          height: 44px
      .login_box
        box-sizing: border-box
        margin: 0 auto
        padding: 0 20px
        height: 28px
        width: 110px
        border-radius: 28px
        font-size: 14px
        font-weight: 200
        line-height: 28px
        color: #fff
        background: #ee1a1a
    .userBox
      /*box-sizing: border-box*/
      display: flex
      /*width: 100%*/
      margin: 24px 34px
      height: 78px
      .userImg
        flex: 0 0 78px
        margin-right: 20px
        height: 78px
        img
          border-radius: 50%
      .userMsg
        flex: 1 0 auto
        height: 78px
        .userName
          font-size: 18px
          line-height: 28px
        .userFocus
          font-size: 12px
          line-height: 32px
          color: #adadaf
        .userTitle
          font-size: 11px
          color: #adadaf
      .right
        flex: 0 0 12px
        height: 78px
        line-height: 78px
        i
          font-size: 15px
          color: #adadaf
    .function_box
      display: flex
      margin-top: 22px
      padding-bottom: 24px
      text-align: center
      .content
        flex: 1 auto
        i
          color: #999999
          font-size: 20px
        p
          margin: 0
          padding: 0
          height: 26px
          font-size: 13px
          font-weight: 100
          line-height: 26px
          color: #999999
    .split
      width: 100%
      height: 6px
      background: #f5f7f9
    .mine-box, .money_box, .other_box
      padding: 0 26px
      & > div
        height: 16px
        border-bottom: 1px solid #edeff3
      /*.mine_msg*/
      & > div:last-child
        border-bottom: 0
      div
        padding: 22px 0
        b
          float: left
          font-size: 16px
        span
          float: right
          font-size: 14px
          line-height: 16px
          color: #c2c2c2
          vertical-align: top
          .red
            color: #eb413d
          i
            font-size: 10px
</style>
