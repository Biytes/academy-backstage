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
  singleSideBarMenu: [],
  multiSideBarMenu: [],
  isLogin: false, // 是否登录成功
  loading: false,
  showImage: {
    currentImage: '',
    imagePage: false
  },
  tags: [],
  majorType: ['计算机科学与技术', '软件工程', '网络工程', '信息与计算科学']
}
