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
  name: 'VPlayer',
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
      isMusic: false
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
    this.clearTimer()
    this.player && this.player.dispose()
  },
  methods: {
    reCreatePlayer () {
      this.clearTimer()
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
      this.player.on('loadedmetadata', this.handleLoaded)
      this.player.on('play', this.handlePlay)
      this.player.on('timeupdate', this.handleProgress)
      this.player.on('pause', this.handlePause)
      this.player.on('error', this.handleError)
      this.player.on('ended', this.handleEnded)
    },
    removeEvent () {
      this.player.off('loadedmetadata', this.handleLoaded)
      this.player.off('play', this.handlePlay)
      this.player.off('timeupdate', this.handleProgress)
      this.player.off('pause', this.handlePause)
      this.player.off('error', this.handleError)
      this.player.off('ended', this.handleEnded)
    },
    handleLoaded () { this.doEmit('loaded') },
    handlePlay () {
      const src = this.player.src()
      const i = src.lastIndexOf('.')
      this.isMusic = src.slice(i + 1).toLowerCase() === 'mp3'
      this.startLog()
      // this.doEmit('play', this.player.duration())
      this.doEmit('play')
    },
    handleProgress () { this.doEmit('timeupdate', this.player.currentTime()) },
    handlePause () { this.doEmit('pause') },
    handleError () { this.doEmit('error') },
    handleEnded () { this.doEmit('ended') },
    // log user's progress
    startLog () {
      this.clearTimer()
      this.timer = setInterval(() => {
        this.thisTime = Math.ceil(this.player.currentTime)
        if (this.thisTime !== this.lastTime) {
          this.lastTime = this.thisTime
          this.doEmit('play', this.thisTime)
        }
      }, 10000)
    },
    clearTimer () { clearInterval(this.timer) },
    doEmit (event, current = this.player.currentTime() || 0, duration = this.player.duration() || 0) {
      event !== 'play' && this.clearTimer()
      this.$emit('emit', { event, time: { current, duration } })
    }
  }
}
</script>
<style src="./style.css" />
