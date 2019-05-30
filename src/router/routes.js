const _import = file => resolve => require([`@views/${file}`], resolve)

export default [{
  path: '/',
  component: _import('layout/login'),
  alias: '/login'
}, {
  path: '/backstage',
  component: _import('layout/backstage'),
  children: [
    {
      name: 'certificate', // 学生证书
      path: '/certificate',
      component: _import('certificate')
    }, {
      name: 'collegeintro', // 学院信息 demo是写死的
      path: '/collegeintro/:category',
      component: _import('collegeIntro')
    }, {
      name: 'educationnews', // 教学新闻
      path: '/educationnews/:category',
      component: _import('educationNews')
    }, {
      name: 'studentnews', // 学生信息
      path: '/studentnews/:category',
      component: _import('studentNews')
    }, {
      name: 'partynews', // 党建工作
      path: '/partynews/:category',
      component: _import('partyNews')
    }, {
      name: 'cooperateinfo', // 对外合作
      path: '/cooperateinfo/:category',
      component: _import('cooperateInfo')
    }, {
      name: 'gallery', // 学院相册
      path: '/gallery/:category',
      component: _import('gallery')
    }, {
      name: 'modified',
      path: '/modified/:category',
      component: _import('modified')
    }, {
      name: 'teacherinfo',
      path: '/teacherInfo',
      component: _import('teacherInfo')
    }, {
      name: 'ieet',
      path: '/ieet',
      component: _import('ieet')
    }, {
      name: 'friendlylink',
      path: '/friendlyLink',
      component: _import('friendlyLink')
    }, {
      name: 'collegenews',
      path: '/collegeNews',
      component: _import('collegeNews')
    }, {
      name: 'reportblog',
      path: '/reportBlog',
      component: _import('reportBlog')
    }, {
      name: 'activity',
      path: '/activity',
      component: _import('activity')
    }, {
      name: 'banners',
      path: '/banners',
      component: _import('banners')
    }, {
      name: 'recruit',
      path: '/recruit/:category',
      component: _import('recruit')
    }, {
      name: 'category',
      path: '/category',
      component: _import('category')
    }
  ]
}]
