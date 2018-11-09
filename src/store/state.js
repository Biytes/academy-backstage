export default {
  userInfo: {
    type: '0', // 0为管理员 1为老师 2为学生
    token: '',
    username: 'admin'
  },
  permissions: '',
  isLogin: false, // 是否登录成功
  loading: false,
  showImage: {
    currentImg: '',
    imagePage: false
  },
  testData: {
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
    banners: [
      {
        date: '2016-05-02',
        title: '王小虎1',
        imageUrl: require('@img/assc/1.jpg'),
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptate dolores. Ex voluptatum doloremque cumque aperiam ad, dolorum, voluptates dolore hic fuga atque cere quas vel inventore sed perferendis.',
        content: '普陀区1'
      }, {
        date: '2016-05-03 12:24:30',
        title: '王小虎',
        imageUrl: require('@img/assc/3.jpg'),
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptate dolores. Ex voluptatum doloremque cumque aperiam ad, dolorum, voluptates dolore hic fuga atque officia. Pcere quas vel inventore sed perferendis.',
        content: '普陀区'
      }, {
        date: '2016-05-03',
        title: '王小虎',
        imageUrl: require('@img/assc/4.jpg'),
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptate dolores. e cumque aperiam ad, dolorum, voluptates dolore hic fuga atque o Facere quas vel inventore sed perferendis.',
        content: '普陀区'
      }, {
        date: '2016-05-03',
        title: '王小虎',
        imageUrl: require('@img/assc/5.jpg'),
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptate dolorperiam ad, dolorum, voluptates dolore hic fuga atque ectus. Facere quas vel inventore sed perferendis.',
        content: '普陀区'
      }
    ],
    tableData: [
      {
        date: '2016-05-02',
        title: '王小虎1',
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptate dolores. Ex voluptatum doloremque cumque aperiam ad, dolorum, voluptates dolore hic fuga atque cere quas vel inventore sed perferendis.',
        content: '普陀区1'
      }, {
        date: '2016-05-03 12:24:30',
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
      }, {
        date: '2016-05-03',
        title: '王小虎',
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptateue ocere quas vel inventore sed perferendis.',
        content: '普陀区'
      }, {
        date: '2016-05-03',
        title: '王小虎',
        briefContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, dolorem consequatur a repudiandae voluptateue ocere quas vel inventore sed perferendis.',
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
    ],
    type: [
      {
        grade: '2014',
        major: [
          {
            name: '计算机科学与技术',
            banJi: [
              {
                value: 1,
                label: '1班'
              }, {
                value: 2,
                label: '2班'
              }, {
                value: 3,
                label: '3班'
              }, {
                value: 4,
                label: '4班'
              }
            ]
          },
          {
            name: '软件工程',
            banJi: [
              {
                value: 1,
                label: '1班'
              }, {
                value: 2,
                label: '2班'
              }, {
                value: 3,
                label: '3班'
              }, {
                value: 4,
                label: '4班'
              }
            ]
          },
          {
            name: '网络工程',
            banJi: [
              {
                value: 1,
                label: '1班'
              }, {
                value: 2,
                label: '2班'
              }
            ]
          }
        ]
      },
      {
        grade: '2015',
        major: [
          {
            name: '计算机科学与技术',
            banJi: [
              {
                value: 1,
                label: '1班'
              }, {
                value: 2,
                label: '2班'
              }, {
                value: 3,
                label: '3班'
              }
            ]
          },
          {
            name: '软件工程',
            banJi: [
              {
                value: 1,
                label: '1班'
              }, {
                value: 2,
                label: '2班'
              }, {
                value: 3,
                label: '3班'
              }, {
                value: 4,
                label: '4班'
              }
            ]
          },
          {
            name: '网络工程',
            banJi: [
              {
                value: 1,
                label: '1班'
              }
            ]
          }
        ]
      },
      {
        grade: '2016',
        major: [
          {
            name: '计算机科学与技术',
            banJi: [
              {
                value: 1,
                label: '1班'
              }, {
                value: 2,
                label: '2班'
              }, {
                value: 3,
                label: '3班'
              }, {
                value: 4,
                label: '4班'
              }, {
                value: 5,
                label: '5班'
              }, {
                value: 6,
                label: '6班'
              }
            ]
          },
          {
            name: '软件工程',
            banJi: [
              {
                value: 1,
                label: '1班'
              }, {
                value: 2,
                label: '2班'
              }, {
                value: 3,
                label: '3班'
              }
            ]
          },
          {
            name: '网络工程',
            banJi: [
              {
                value: 1,
                label: '1班'
              }, {
                value: 2,
                label: '2班'
              }
            ]
          }
        ]
      },
      {
        grade: '2017',
        major: [
          {
            name: '计算机科学与技术',
            banJi: [
              {
                value: 1,
                label: '1班'
              }, {
                value: 2,
                label: '2班'
              }, {
                value: 3,
                label: '3班'
              }, {
                value: 4,
                label: '4班'
              }
            ]
          },
          {
            name: '软件工程',
            banJi: [
              {
                value: 1,
                label: '1班'
              }, {
                value: 2,
                label: '2班'
              }, {
                value: 3,
                label: '3班'
              }
            ]
          },
          {
            name: '网络工程',
            banJi: [
              {
                value: 1,
                label: '1班'
              }, {
                value: 2,
                label: '2班'
              }
            ]
          }
        ]
      }
    ]
  }
}
