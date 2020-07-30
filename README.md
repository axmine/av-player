# av-player (audio & video player)

A vue components of video player based on video.js

# Usage

page.vue
```javascript
<template>
  <av-player
    :src="source"
    @emit="onEmit"
  />
</template>

import AvPlayer from 'av-player'

export default {
  name: 'PageIndex',
  components: {
    AvPlayer
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

## Change log

2020.7.30: fix style
2020.7.28: fix click to pause