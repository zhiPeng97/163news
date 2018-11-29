<template>
  <transition name="move">
    <div class="login">
      <div class="transition">
        <div class="nav">
          <div class="close">
            <span @click="closeLogin">×</span>
          </div>
          <div class="icon">
            <img src="../../public/img/al4.png" width="80">
          </div>
        </div>
        <div class="login_box">
          <div class="login_msg">
            <div class="title">手机快速登陆</div>
            <div class="num">
              <input type="number" placeholder="手机号" v-model="telPhone">
              <div class="get_code" :class="showCode?'codeActive': ''" @click="getCodeFun">获取验证码</div>
              <transition name="showcodeBox">
                <div class="codeBox" v-show="showCodeTop">
                  <span>验证码：{{randCode}} &nbsp;,&nbsp;网易用户,&nbsp;您正在使用手机账号登入服务【网易新闻】</span>
                </div>
              </transition>
            </div>
            <div class="code">
              <input type="number" placeholder="验证码" v-model="codeInp">
            </div>
            <div class="star" :class="LoginStar?'starActive': ''" @click="LoginStarFun">
              开始使用
            </div>
          </div>
          <div class="login_link">
            <div class="text_link">
              <div class="mail">邮箱账号登录</div>
              <div class="tel">手机号注册</div>
            </div>
            <div class="link_box">
              <div class="wb">
                <img src="../../public/img/ald.png" alt="">
              </div>
              <div class="wx">
                <img src="../../public/img/alb.png">
              </div>
              <div class="qq">
                <img src="../../public/img/al3.png">
              </div>
              <div class="xm">
                <img src="../../public/img/alf.png">
              </div>
            </div>
          </div>
          <div class="login_pact">
            登录即代表您页阅读并同意
            <a href="#">服务条约</a>
            和
            <a href="#">隐私条约</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        telPhone: '',
        randCode: '',
        showCode: false,
        codeInp: '',
        showCodeTop: false,
        LoginStar: false
      }
    },
    watch: {
      telPhone(newTel, oldTel) {
        if (newTel.length === 11 && (/^1[34578]\d{9}$/.test(newTel))) {
          this.showCode = true // 当手机号码格式输入正确时，可以获取验证码
        } else {
          this.showCode = false
        }
      },
      codeInp(newCodeInp, oldCodeInp) {
        if (newCodeInp === this.randCode) {
          this.LoginStar = true // 当输入的验证码正确的时候，登录选项高亮
        } else {
          this.LoginStar = false
        }
      }
    },
    methods: {
      closeLogin() {
        this.$emit('closeLogin') // 这里可以传多个值
      },
      getCodeFun() { // 获取随机验证码
        let codeVal = ''
        if (this.showCode) {
          this.showCodeTop = true
          for (var i = 0; i < 6; i++) { // 通过for循环获取到六个随机数 codeval
            var rand = Math.floor(Math.random() * 6)
            codeVal = codeVal + rand
          }
          this.randCode = codeVal // 把获取到的六位随机数赋给 this.randCode
        } else {
          this.showCode = false
          this.randCode = ''
        }
      },
      LoginStarFun() {
        this.telPhone = ''
        this.randCode = ''
        this.showCode = false
        this.codeInp = ''
        this.showCodeTop = false
        this.$emit('LoginStarFun') // 这里可以传多个值
        // console.log('aaa')
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .login
    position: fixed
    width: 100%
    height: 100%
    box-sizing: border-box
    padding: 10px 14px
    color: red
    background: #fff
    z-index: 1000
    /*transform: translate(100%)*/
    transition: all 0.2s linear
    &.move-leave-to, &.move-enter
      opacity: 0.7
      transform: translate(100%)
    .transition
      transition: all 5s linear
      .nav
        .close
          font-size: 34px
          font-weight: 300
          color: #606060
        .icon
          margin-top: 28px
          text-align: center
      .login_box
        margin-top: 60px
        .login_msg
          padding: 0 25px
          .title
            margin-bottom: 30px
            font-size: 20px
            font-weight: bold
            color: #303030
          .num, .code
            position: relative
            margin-top: 20px
            text-align: left
            border-bottom: 1px solid #e4e8e7
            color: #3c3c3c
            .get_code
              /*outline(轮廓)是绘制于元素周围的一条线 */
              /*outline-color、outline-style、outline-width*/
              position: absolute
              display: inline-block
              margin-top: 6px
              float: right
              padding: 0 6px
              height: 24px
              border: 1px solid #e4e8e7
              border-radius: 20px
              color: #d7dbda
              line-height: 24px
              &.codeActive
                color: #000
            .codeBox
              box-sizing: border-box
              position: fixed
              top: 0
              left: 0
              padding: 10px
              width: 100%
              height: 80px
              font-weight: 300
              transition: all .5s linear
              &.showcodeBox-enter, &.showcodeBox-leave-to
                transform: translateY(-100%)
              & > span
                box-sizing: border-box
                display: block
                padding: 10px
                line-height: 20px
                background: #eee
                width: 100%
                height: 60px
                border-radius: 6px
            input
              padding: 12px 0
              border: none
              outline-style: none
              font-size: 16px
              line-height: 18px
              vertical-align: center
          .star
            margin: 20px auto
            width: 100%
            text-align: center
            height: 44px
            border-radius: 22px
            font-size: 16px
            line-height: 44px
            color: #fff1f0
            background: #f9b9ba
            &.starActive
              background: #e10000
        .login_link
          /*width: 100%*/
          .text_link
            padding: 0 26px
            height: 20px
            color: #000
            .mail
              float: left
            .tel
              float: right
          .link_box
            margin: 48px 0 0 42px
            display: block
            & > div
              display: inline-block
              margin-right: 22px
              width: 46px
              img
                width: 46px
              &:last-child
                margin-right: 0
        .login_pact
          margin: 16px auto
          text-align: center
          font-size: 10px
          color: #d7dbda
          a
            color: #d7dbda
            text-decoration: underline

</style>
