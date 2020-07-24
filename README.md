# v-player

A vue components of video player based on video.js

# Usage

page.vue
```javascript
<template>
  <v-player
    :src="source"
    @emit="onEmit"
  />
</template>
import VPlayer from 'v-player'
export default {
  name: 'PageIndex',
  components: {
    VPlayer
  },
  data () {
    return {
      source: 'http://test.com/test.mp4'
    }
  },
  methods: {
    onEmit (e) {
      console.log(e)
    }
  }
}

```

## props
- src: {string} video url
- poster: {string} poster url
- options: {object} video.js options

## event
emit

## methods
play()
pause()
muted() return or set mute
src() change source url