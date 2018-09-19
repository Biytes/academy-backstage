const _import = file => resolve => require([`@views/${file}`], resolve)

export default [{
  path: '/',
  component: _import('layout/backstage'),
  children: [
    {
      path: '/',
      component: _import('login')
    }, {
      path: '/certificate',
      component: _import('certificate')
    }, {
      path: '/schoolInfo/:id',
      component: _import('schoolInfo')
    }, {
      path: '/educationInfo/:id',
      component: _import('educationInfo')
    }, {
      path: '/studentInfo/:id',
      component: _import('schoolInfo')
    }, {
      path: '/communistInfo/:id',
      component: _import('communistInfo')
    }, {
      path: '/cooperateInfo/:id',
      component: _import('cooperateInfo')
    }, {
      path: '/gallery/:id',
      component: _import('gallery')
    }, {
      path: '/teacher',
      component: _import('teacher')
    }, {
      path: '/friendlyLink',
      component: _import('friendlyLink')
    }, {
      path: '/news',
      component: _import('news')
    }, {
      path: '/reportBlog',
      component: _import('reportBlog')
    }, {
      path: '/event',
      component: _import('event')
    }, {
      path: '/modified',
      component: _import('modified')
    }
  ]
}]
