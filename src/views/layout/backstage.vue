<template lang="html">
  <div class="wrapper">
    <show-img></show-img>
    <el-row class="wrapper-header">
      <backstage-header></backstage-header>
    </el-row>
    <el-row class="wrapper-inner" v-if="isLogin">
      <el-col class="wrapper-inner__menu" :span="3">
        <backstage-menu></backstage-menu>
      </el-col>
      <el-col class="wrapper-inner__content"
              v-loading="loading"
              :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import backstageHeader from '@views/layout/backstageHeader'
import backstageMenu from '@views/layout/backstageMenu'
import showImg from '@views/layout/showImg'

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
@media (min-width: 1200px) and (max-width: 1366px) {
  .wrapper-inner {
    width: 100%;
  }
}
</style>
