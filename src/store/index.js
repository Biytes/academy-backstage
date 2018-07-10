import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  client: '1', // 1为老师 0为学生
  menu: false, // 菜单的出现
  status: false, // 控制登陆是否成功
  testData: {
    currentImg: '',
    imgPage: false,
    Users: [
      {
        createDate: '',
        username: 'ensave',
        password: 'ensave',
        grade: '',
        major: '',
        banJi: '',
        clientType: 1
      }, {
        createDate: '',
        username: 'teacher',
        password: 'teacher',
        grade: '',
        major: '',
        banJi: '',
        clientType: 1
      }, {
        createDate: '',
        username: 'stu',
        password: 'stu',
        grade: '',
        major: '',
        banJi: '',
        clientType: 0
      }],
    tableData: [
      {
        date: '2016-05-02',
        title: '王小虎1',
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptate dolores. Ex voluptatum doloremque cumque aperiam ad, dolorum, voluptates dolore hic fuga atque cere quas vel inventore sed perferendis.',
        content: '普陀区1'
      }, {
        date: '2016-05-03',
        title: '王小虎',
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptate dolores. Ex voluptatum doloremque cumque aperiam ad, dolorum, voluptates dolore hic fuga atque officia. Pcere quas vel inventore sed perferendis.',
        content: '普陀区'
      }, {
        date: '2016-05-03',
        title: '王小虎',
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptate dolores. e cumque aperiam ad, dolorum, voluptates dolore hic fuga atque o Facere quas vel inventore sed perferendis.',
        content: '普陀区'
      }, {
        date: '2016-05-03',
        title: '王小虎',
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptate dolorperiam ad, dolorum, voluptates dolore hic fuga atque ectus. Facere quas vel inventore sed perferendis.',
        content: '普陀区'
      }, {
        date: '2016-05-03',
        title: '王小虎',
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptate dolo ad, dolorum, voluptates dolore hic fuga atquee quas vel inventore sed perferendis.',
        content: '普陀区'
      }, {
        date: '2016-05-03',
        title: '王小虎',
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptate dolores. Ex voluptatum doloremque cumque aperiam ad, dolorum, voluptates dolore hic fuga atququas vel inventore sed perferendis.',
        content: '普陀区'
      }, {
        date: '2016-05-03',
        title: '王小虎',
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptate dolores. am ad, dolorum, voluptates dolore hic fuga atque vel inventore sed perferendis.',
        content: '普陀区'
      }, {
        date: '2016-05-03',
        title: '王小虎',
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptateue ocere quas vel inventore sed perferendis.',
        content: '普陀区'
      }
    ],
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
      }],
    events: [
      {
        title: '模拟ACM程序设计大赛通知',
        briefContent: '为培养和激励我校写程解决问题的能力',
        startTime: 'Mon Jul 15 2018 10:40:35 GMT+0800 (台北标准时间)',
        endTime: 'Mon Jul 22 2018 10:40:35 GMT+0800 (台北标准时间)'
      },
      {
        title: '模拟ACM程序设计大赛通知asdasdasd',
        briefContent: '为培养和激励我校写程解决问题的能力',
        startTime: 'Mon Jul 02 2018 10:40:35 GMT+0800 (台北标准时间)',
        endTime: 'Mon Jul 15 2018 10:40:35 GMT+0800 (台北标准时间)'
      },
      {
        title: '模拟ACM程序设计大赛通知',
        briefContent: '为培养和激励我校写程解决问题的能力',
        startTime: 'Mon Jul 18 2018 10:40:35 GMT+0800 (台北标准时间)',
        endTime: 'Mon Jul 23 2018 10:40:35 GMT+0800 (台北标准时间)'
      },
      {
        title: '模拟ACM程序设计大赛通知',
        briefContent: '为培养和激励我校写程解决问题的能力',
        startTime: 'Mon Jul 1 2018 10:40:35 GMT+0800 (台北标准时间)',
        endTime: 'Mon Jul 7 2018 10:40:35 GMT+0800 (台北标准时间)'
      },
      {
        title: '模拟ACM程序设计大赛通知',
        briefContent: '为培养和激励我校写程解决问题的能力',
        startTime: 'Mon Jul 05 2018 10:40:35 GMT+0800 (台北标准时间)',
        endTime: 'Mon Jul 30 2018 10:40:35 GMT+0800 (台北标准时间)'
      }
    ]
  }
}
export default new Vuex.Store({
  state
})
