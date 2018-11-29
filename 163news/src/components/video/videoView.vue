<template>
  <div class="video">
    <div class="head">热门视频</div>
    <div class="video_scroll" ref="video">
      <div>
        <div class="video_box" v-for="(val, index) in videoUrl" :key="index">
          <div class="title" ref="title" @click="play_video(!video)">
            <div class="titleText">{{val.title}}</div>
            <div class="play_count">{{Math.floor(val.playCount / 1000) / 10}}万次播放</div>
          </div>
          <div class="video">
            <!--<video src="{{val.mp4_url}}"></video>-->
            <video controls
                   :poster="val.cover"
                   preload="none"
                   width="100%"
                   ref="videos"
                   @click="play_video()">
              <source :src="val.mp4_url"/>
            </video>
          </div>
          <div class="bottom">
            <div class="videoMsg">
              <div class="tname">
                <img :src="val.videoTopic.topic_icons" alt="" width="22">
                <span>{{val.videoTopic.tname}}</span>
              </div>
              <div class="extraTags" v-for="(tag, count) in val.extraTags" :key="count" >
                <span>{{tag}}</span>
              </div>
            </div>
            <div class="praise" @click="praiseFun(index)">
              <i class="icon-praise"></i>
              <span>{{praiseCounts[index]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'

  const $ = require('jquery')
  export default {
    created() {
      this.axios.get('http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&size=20')
        .then(res => {
          // console.log(res)
          res = res.data.视频
          // console.log(res)
          this.videoUrl = res
          this.videoScroll = new Bscroll(this.$refs.video, {
            click: true
          })
        })
    },
    data() {
      return {
        videoDatas: [],
        video: 'null',
        videoUrl: {},
        praiseCounts: [421, 435, 5467, 3234, 1221, 4535, 3424, 523, 1232, 1312, 77, 442, 231, 1424, 7652, 346, 13, 731, 904, 39, 54, 127, 431],
        showPraise: false
      }
    },
    methods: {
      play_video(video) {
        if (video) {
          this.$refs.title.style = {'display': 'block'}
        } else {
          this.$refs.title.style = {'display': 'none'}
        }
      },
      praiseFun(i) {
        this.showPraise = !this.showPraise
        if (this.showPraise) {
          this.praiseCounts[i]++
        } else {
          this.praiseCounts[i]--
        }
        $('.praise>span').eq(i).text(this.praiseCounts[i])
        $('.praise').eq(i).toggleClass('praiseRed')
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .video
    width: 100%
    overflow: hidden
    .head
      margin: 0 auto
      height: 46px
      max-width: 600px
      font-size: 17px
      font-weight: 600
      line-height: 46px
      text-align: center
      color: #444
      border-bottom: 1px solid #A5A5A5
    .video_scroll
      position: absolute
      top: 47px
      left: 0
      width: 100%
      bottom: 46px
      overflow: hidden
      .video_box
        position: relative
        /*height: 300px*/
        .title
          position: absolute
          top: 10px
          left: 0
          padding: 3px 10px
          font-size: 15px
          line-height: 20px
          color: #fff
          z-index: 100
          .play_count
            margin-top: 4px
            font-size: 11px
        .video
          /*position: absolute*/
          /*left: 0*/
          margin: 0 auto
          width: 100%
          max-width: 600px
          /*height: 187px*/
          overflow: hidden
        .bottom
          /*position: absolute*/
          margin: 10px auto 22px
          display: flex
          width: 100%
          max-width: 600px
          height: 24px
          /*overflow: hidden*/
          .videoMsg
            padding-left: 10px
            width: 100%
            overflow: hidden
            height: 22px
            .tname, .extraTags
              margin-right: 6px
              float: left
              height: 22px
              font-weight: 300
              font-size: 12px
              border-radius: 24px
              background: #e7e9e7
              span
                display: inline-block
                padding: 0 10px
                line-height: 22px
                float: right
              img
                display: inline-block
                border-radius: 22px
          .praise
            float: right
            width: 120px
            text-align: center
            line-height: 24px
            color: #ccc
            i
              font-size: 18px
              color: #888
            span
              font-size: 12px
              line-height: 20px
              vertical-align: top
              color: #888
            &.praiseRed
              i, span
                color: red

</style>
