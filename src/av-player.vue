<template>
  <div
    :class="{'is-music': isMusic}"
    id="v-yocss-player"
  />
</template>
<script>
import 'video.js/dist/video-js.min.css'
// import 'videojs-flash'
import 'videojs-contrib-hls'
import videojs from 'video.js'
const zh = require('video.js/dist/lang/zh-CN.json')
export default {
  name: 'AvPlayer',
  props: {
    src: {
      type: String,
      default: ''
    },
    poster: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      player: null,
      timer: null,
      lastTime: 0,
      thisTime: 0,
      video: null,
      isMusic: false,
      events: [
        'loadstart', // 加载开始
        'loadedmetadata', // 元数据加载完成
        'loadedplaylist', // 播放列表加载完成
        'progress',
        // 'earlyabort', // 提前终止
        'canplay',
        'firstplay',
        // 'textdata', // 字幕数据?
        'play',
        'pause',
        'ended',
        // 'seeking', // 查找中
        'seeked', // 查找完成
        // 'stageclick', // 阶段视频点击
        // 'sourceset', // 源设置
        // 'playing',
        'waiting',
        'timeupdate', // 播放更新
        'controlsvisible',
        // 'durationchange',
        // 'enterpictureinpicture', // 进入画中画
        // 'leavepictureinpicture', // 离开画中画
        'fullscreenchange', // 全屏状态改变
        // 'webkitbeginfullscreen', // 开启全屏
        // 'webkitendfullscreen', // 结束全屏
        // 'playerreset', // 播放器重置
        // 'volumechange', // 声音改变
        // 'ratechange',
        // 'mediachange', // 媒体改变
        // 'playerresize', // 播放器尺寸改变
        // 'posterchange', // 封面改变
        // 'fullscreenerror', // 全屏错误
        'error'
      ]
    }
  },
  // computed: {},
  watch: {
    src () {
      this.reCreatePlayer()
    },
    'options.sources': {
      handler () {
        this.reCreatePlayer()
      }
    }
  },
  mounted () {
    this.createPlayer()
  },
  beforeDestroy () {
    // this.clearTimer()
    this.player && this.player.dispose()
  },
  methods: {
    reCreatePlayer () {
      // this.clearTimer()
      if (this.player) {
        this.removeEvent()
        this.player.dispose()
        this.player = null
      }
    },
    createPlayer () {
      if (this.src || this.options.sources) {
        videojs.addLanguage('zh-CN', zh)
        // 1. create video tag
        const cls = 'v-yocss-player-box video-js vjs-big-play-centered'
        const video = videojs.dom.createEl('video', {}, { class: cls })
        const ref = document.getElementById('v-yocss-player').appendChild(video)
        // 2. merge options
        const options = Object.assign({
          autoplay: false,
          controls: true,
          playsinline: videojs.browser.IS_IOS,
          webkitPlaysinline: videojs.browser.IS_IOS,
          preload: 'auto',
          responsive: true,
          fluid: true,
          language: 'zh-CN',
          aspectRatio: '16:9', // view ratio
          controlBar: {},
          playbackRates: [] // play spend
        }, {
          sources: this.src || '',
          poster: this.poster || ''
        }, this.options)
        const _this = this
        // 3. create player
        this.player = videojs(ref, options, function onPlayerReady () {
          _this.addEvent()
        })
      }
    },
    addEvent () {
      for (let i = 0; i < this.events.length; i++) {
        const event = this.events[i]
        if (event === 'play') {
          const i = this.player.src().lastIndexOf('.')
          this.isMusic = src.slice(i + 1).toLowerCase() === 'mp3'
        }
        this.player.on(event, this.playEvent)
      }
    },
    removeEvent () {
      for (let i = 0; i < this.events.length; i++) {
        this.player.off(this.events[i], this.playEvent)
      }
    },
    playEvent (e) {
      const data = e.type !== 'error' ? {} : e
      this.doEmit(e.type, data)
    },
    doEmit (event, data = {}) {
      const current = this.player.currentTime() || 0
      const duration = this.player.duration() || 0
      const emitData = Object.assign({
        event,
        time: { current, duration }
      }, data)
      this.$emit('emit', emitData)
    }
  }
}
</script>
<style src="./style.css" />
