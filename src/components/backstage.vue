<template lang="html">
  <div >
    <showImg></showImg>
    <backstageHeader></backstageHeader>
    <div id="content-layout">
      <backstageMenuNav></backstageMenuNav>
      <section id="content">
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>
<script>
import backstageHeader from '@/components/backstageHeader'
import backstageMenuNav from '@/components/backstageMenu'
import showImg from '@/components/showImg'
import '@css/topBar.css'
import '@css/customInput.css'
import '@css/global.css'
export default {
  created () {
  },
  mounted () {
    this.resetStatus()
  },
  data () {
    return {
    }
  },
  components: {
    backstageHeader,
    backstageMenuNav,
    showImg
  },
  methods: {
    resetStatus () {
    }
  }
}
</script>

<style lang="css">
.left{
  float:left;
}
.right{
  float:right;
}
#content-layout{
  width:100%;
  height:auto;
  position: relative;
}
#content{
  width:-moz-calc(100% - (305px));
  width:-webkit-calc(100% - (305px));
  width: calc(100% - (305px));
  min-width: 1000px;
  height: auto;
  min-height:900px;
  position: absolute;
  text-align: center;
  right:0;
}
#content{
  background-color: rgb(190, 190, 172);
    /*background: url("../assets/img/background/background.png");*/
    background: #fff;
    z-index: 1;
    height: 100%;
}
@media (min-width: 1200px) and (max-width: 1366px) {
  #content{
    width: calc(100% - 195.555px);
  }
}
</style>
