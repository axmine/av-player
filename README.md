# @yocss/vue-player

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

import VPlayer from '@yocss/vue-player'

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

# API

## Props
| props | description | type | default |
| ---- | ---- | ---- | ---- |
| src | video's url | string |  |
| poster | poster's url | string |  |
| options | video.js options | object | {} |

## Events
emit args => ({ event: string, time: { current: number, duration: number } })
| event | description |
| ---- | ---- |
| loaded | emit after loaded the meta data |
| play | emit after play |
| pause | emit after pause |
| error | emit on error |
| ended | emit after ended play |

## Methods

| method | description |
| ---- | ---- |
| play() | do play |
| pause() | pause play |
| muted() | on/off volume |
| src() | change source url |