import AvPlayer from './src/av-player.vue';

AvPlayer.install = function(Vue) {
  Vue.component(AvPlayer.name, ElIcon);
};

export default AvPlayer;
