import Vue from 'vue'
import Router from 'vue-router'
import backstage from '@/components/backstage'
import Login from '@views/Login'
import Teacher from '@views/Teacher'
import Friendly from '@views/Friendly'
import News from '@views/News'
import Modified from '@views/Modified'
import reportBlog from '@views/ReportBlog'
import schoolInfo from '@views/schoolInfo'
import educationInfo from '@views/educationInfo'
import studentInfo from '@views/studentInfo'
import communistInfo from '@views/communistInfo'
import cooperateInfo from '@views/cooperateInfo'
import gallery from '@views/gallery'
import events from '@views/event'
// schoolInfo
// import schoolInfoAbout from '@views/schoolInfo/about'
// import schoolInfoFacility from '@views/schoolInfo/facility'
// import schoolInfoTeacherSrc from '@views/schoolInfo/teacher'
// import schoolInfoMajor from '@views/schoolInfo/major'
// // educationInfo
// import educationInfoFile from '@views/educationInfo/file'
// import educationInfoDownload from '@views/educationInfo/download'
// import educationInfoManagement from '@views/educationInfo/management'
// import educationInfoProtocol from '@views/educationInfo/protocol'
// // studentInfo
// import studentInfoCondition from '@views/studentInfo/condition'
// import studentInfoMoment from '@views/studentInfo/moment'
// import studentInfoMilitaryTraining from '@views/studentInfo/militaryTraining'
// import studentInfoPractice from '@views/studentInfo/practice'
// import studentInfoMotto from '@views/studentInfo/motto'
// import studentInfoGlory from '@views/studentInfo/glory'
// // communistInfo
// import communistInfoWork from '@views/communistInfo/work'
// import communistInfoFacility from '@views/communistInfo/facility'
// import communistInfoOrganization from '@views/communistInfo/organization'
// import communistInfoInstruction from '@views/communistInfo/instruction'
// // cooperateInfo
// import cooperateInfoInternational from '@views/cooperateInfo/international'
// import cooperateInfoEnterprise from '@views/cooperateInfo/enterprise'
// // gallery
// import galleryLab from '@views/gallery/lab'
// import galleryNetherland from '@views/gallery/Netherland'
// // shelf
import certificate from '@views/certificate'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [{
    path: '/',
    component: backstage,
    children: [
      { path: '/', component: Login },
      { path: '/certificate', component: certificate },
      { path: '/schoolInfo/:id', component: schoolInfo },
      { path: '/educationInfo/:id', component: educationInfo },
      { path: '/studentInfo/:id', component: studentInfo },
      { path: '/communistInfo/:id', component: communistInfo },
      { path: '/cooperateInfo/:id', component: cooperateInfo },
      { path: '/gallery/:id', component: gallery },
      { path: '/teacher', component: Teacher },
      { path: '/friendlyLink', component: Friendly },
      { path: '/news', component: News },
      { path: '/reportBlog', component: reportBlog },
      { path: '/event', component: events },
      { path: '/modified', component: Modified }
    ]
  }
  ]
})
