<template lang="html">
  <div class="wrapper">
    <show-img></show-img>
    <el-row>
      <backstage-header></backstage-header>
    </el-row>
    <el-row class="wrapper-inner">
      <el-col class="wrapper-inner__menu"
              :span="isLogin ? 3 : 0">
        <backstage-menu></backstage-menu>
      </el-col>
      <el-col class="wrapper-inner__content"
              :span="isLogin ? 20 : 24"
              v-loading="loading">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import backstageHeader from '@views/layout/backstageHeader'
import backstageMenu from '@views/layout/backstageMenu'
import showImg from '@views/layout/showImg'
import '@css/topBar.css'
import '@css/customInput.css'
import '@css/global.css'

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'isLogin',
      'loading'
    ])
  },
  data () {
    return {
    }
  },
  components: {
    backstageHeader,
    backstageMenu,
    showImg
  },
  methods: {
  }
}
</script>

<style lang="scss">

.el-row {
  margin-bottom: 0;
}

.wrapper-inner {
  position: relative;

  &__content {
    margin-left: 2.4%;
  }
}
</style>
