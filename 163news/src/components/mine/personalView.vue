<template>
  <div class="personal">
    <div class="top"></div>
    <div class="userBox">
      <div class="userImg">
        <img :src="user[0].userImg" width="78" height="78">
      </div>
      <div class="userName">{{user[0].userName}}</div>
      <div class="userTitle">{{user[0].userTitle}}</div>
      <div class="focus">
        <span><b>{{user[0].focus}}</b>关注</span>
        <span><b>{{user[0].beFocused}}</b>被关注</span>
      </div>
      <div class="edit">编辑资料</div>
    </div>
    <div class="split"></div>
    <div class="follow-up"></div>
    <div class="logOut" @click="$emit('LoginOut')">登出</div>
  </div>
</template>

<script>
  export default {
    props: ['user']
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .personal
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: #fff
    .top
      height: 130px
      width: 100%
      background: #232323
    .userBox
      position: relative
      padding: 0 20px
      .userImg
        height: 58px
        img
          border: 5px solid #fff
          display: inline
          position: relative
          margin-top: -39px
          border-radius: 50%
      .userName
        height: 20px
        font-size: 20px
        font-weight: bold
      .userTitle
        margin-top: 16px
        font-size: 13px
        font-weight: 300
        color: #a4a4a4
      .focus
        margin: 18px 0
        span
          margin-right: 28px
          font-size: 15px
          color: #a4a4a4
          b
            color: #2c2c2c
            font-weight: bold
            margin-right: 8px
      .edit
        position: absolute
        top: 10px
        right: 20px
        border: 1px solid #6a6a6a
        border-radius: 16px
        font-size: 14px
        color: #6a6a6a
        padding: 8px
    .split
      width: 100%
      height: 6px
      background: #f7f7f7
    .follow-up
      min-height: 200px
    .logOut
      margin: 0 auto
      height: 50px
      width: 90%
      background: #ec4039
      color: #fff4f2
      font-size: 17px
      line-height: 50px
      text-align: center
      border-radius: 4px
      box-shadow: 0 2px 3px #c4c4ca
</style>
