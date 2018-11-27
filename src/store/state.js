export default {
  userInfo: {
    type: '0', // 0为管理员 1为老师 2为学生
    token: '',
    username: 'admin',
    stu_class: '',
    major: '',
    grade: ''
  },
  permissions: '',
  isLogin: false, // 是否登录成功
  loading: false,
  showImage: {
    currentImg: '',
    imagePage: false
  },
  tags: [],
  majorType: ['计算机科学与技术', '软件工程', '网络工程', '信息与计算科学'],
  testData: {
    shelves: [
      {
        id: 0,
        shelfName: 'Credential',
        editShelfMode: false,
        Items: [{
          name: 'ACM 二等奖',
          owner: '黎启浚',
          awardTime: '2015-08-09',
          imgUrl: require('@img/assc/陈沛韩.jpg'),
          tags: ['ACM', 'LQB'],
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi tempora quasi hic, voluptate iure incidunt modi aut. Beatae quod sapiente reprehenderit molestiae deleniti temporibus facilis nemo illum voluptates architecto provident accusantium hic in qui itaque et, inventore. Provident recusandae dolore laboriosam sit, esse incidunt quibusdam doloribus praesentium deleniti numquam. Facilis.'
        }, {
          name: 'ACM 二等奖',
          owner: '黎启浚',
          awardTime: '2015-08-09',
          imgUrl: require('@img/assc/高俊豪.jpg'),
          tags: ['ACM', 'LQB'],
          description: 'dddddddddddddddd'
        }, {
          name: 'ACM 二等奖',
          owner: '黎启浚',
          awardTime: '2015-08-09',
          imgUrl: require('@img/assc/李家隆.jpg'),
          tags: ['ACM', 'LQB'],
          description: 'ddddddddddddddd'
        }, {
          name: 'ACM 二等奖',
          owner: '黎启浚',
          awardTime: '2015-08-09',
          imgUrl: require('@img/assc/尤家粤.jpg'),
          tags: ['ACM', 'LQB'],
          description: ''
        }, {
          name: 'ACM 二等奖',
          owner: '黎启浚',
          awardTime: '2015-08-09',
          imgUrl: require('@img/assc/韦婷.jpg'),
          tags: ['ACM', '广州'],
          description: ''
        }, {
          name: 'ACM 二等奖',
          owner: '黎启浚',
          awardTime: '2015-08-09',
          imgUrl: require('@img/assc/6.jpg'),
          tags: ['ACM', '深圳'],
          description: ''
        }]
      },
      {
        id: 1,
        shelfName: '蓝桥杯',
        editShelfMode: false,
        Items: [{
          name: 'ACM 二等奖',
          owner: '黎启浚',
          awardTime: '2015-08-09',
          imgUrl: require('@img/assc/1.jpg'),
          tags: ['ACM', 'LQB'],
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi tempora quasi hic, voluptate iure incidunt modi aut. Beatae quod sapiente reprehenderit molestiae deleniti temporibus facilis nemo illum voluptates architecto provident accusantium hic in qui itaque et, inventore. Provident recusandae dolore laboriosam sit, esse incidunt quibusdam doloribus praesentium deleniti numquam. Facilis.'
        }, {
          name: 'ACM 二等奖',
          owner: '黎启浚',
          awardTime: '2015-08-09',
          imgUrl: require('@img/assc/2.jpg'),
          tags: ['ACM', 'LQB'],
          description: 'dddddddddddddddd'
        }, {
          name: 'ACM 二等奖',
          owner: '黎启浚',
          awardTime: '2015-08-09',
          imgUrl: require('@img/assc/3.jpg'),
          tags: ['ACM', 'LQB'],
          description: 'ddddddddddddddd'
        }, {
          name: 'ACM 二等奖',
          owner: '黎启浚',
          awardTime: '2015-08-09',
          imgUrl: require('@img/assc/4.jpg'),
          tags: ['ACM', 'LQB'],
          description: ''
        }, {
          name: 'ACM 二等奖',
          owner: '黎启浚',
          awardTime: '2015-08-09',
          imgUrl: require('@img/assc/5.jpg'),
          tags: ['ACM', '广州'],
          description: ''
        }, {
          name: 'ACM 二等奖',
          owner: '黎启浚',
          awardTime: '2015-08-09',
          imgUrl: require('@img/assc/6.jpg'),
          tags: ['ACM', '深圳'],
          description: ''
        }]
      }]
  }
}
