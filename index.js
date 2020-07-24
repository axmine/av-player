import VPlayer from './src/v-player.vue';

VPlayer.install = function(Vue) {
  Vue.component(VPlayer.name, ElIcon);
};

export default VPlayer;