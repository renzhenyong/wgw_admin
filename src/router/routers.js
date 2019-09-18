import Main from '@/components/main'
import parentView from '@/components/parent-view'

export default [
  {
    path: '/',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    }, 
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    children: [
      {
        path: '/news/'+1,
        name: 'intro',
        meta: {
          icon: 'ios-book',
          title: '学校简介'
        },
        component: () => import('@/view/news/news.vue')
      }
    ]
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: '/news/'+2,
        name: 'news',
        meta: {
          icon: 'ios-book',
          title: '校园新闻'
        },
        component: () => import('@/view/news/news.vue')
      }
    ]
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
   
    children: [
      {
        path: '/news/'+3,
        name: 'deyu',
        meta: {
        
          icon: 'ios-book',
          title: '德育之窗'
        },
        component: () => import('@/view/news/news.vue')
      }
    ]
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    children: [
      {
        path: '/news/'+4,
        name: 'dangjian',
        meta: {
          icon: 'ios-book',
          title: '党建之窗'
        },
        component: () => import('@/view/news/news.vue')
      }
    ]
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    children: [
      {
        path: '/news/'+5,
        name: 'jiaoshi',
        meta: {
          icon: 'ios-book',
          title: '教师发展'
        },
        component: () => import('@/view/news/news.vue')
      }
    ]
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    children: [
      {
        path: '/news/'+6,
        name: 'huodong',
        meta: {
          icon: 'ios-book',
          title: '学生园地'
        },
        component: () => import('@/view/news/news.vue')
      }
    ]

  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    children: [
      {
        path: '/news/'+11,
        name: 'jiaoyu',
        meta: {
          icon: 'ios-book',
          title: '教育科研'
        },
        component: () => import('@/view/news/news.vue')
      }
    ]

  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    children: [
      {
        path: '/news/'+7,
        name: 'pingan',
        meta: {
          icon: 'ios-book',
          title: '平安校园'
        },
        component: () => import('@/view/news/news.vue')
      }
    ]
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    children: [
      {
        path: '/news/'+8,
        name: 'jiaxiao',
        meta: {
          icon: 'ios-book',
          title: '家校互动'
        },
        component: () => import('@/view/news/news.vue')
      }
    ]
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: '/news/'+9,
        name: 'tongzi',
        meta: {
          icon: 'md-notifications',
          title: '通知公告'
        },
        component: () => import('@/view/news/news.vue')
      }
    ]
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: '/news/'+10,
        name: 'lunbo',
        meta: {
          icon: 'ios-book',
          title: '首页轮播图'
        },
        component: () => import('@/view/news/news.vue')
      }
    ]
  },

  {
    path: '/join',
    name: 'join',
    component: Main,

    children: [
      {
        path: 'zhanghao',
        name: 'zhanghao',
        meta: {
          icon: 'md-grid',
          title: '用户管理'
        },
        component: () => import('@/view/users/users.vue')
      }
    ]
  },

  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'forms/:type/:newid',
        name: 'forms',
        meta: {
          icon: 'md-flower',
          title: '编辑新闻',
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/components/form.vue')
      },

    ]
  },{
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'forms1',
        name: 'forms1',
        meta: {
          icon: 'md-flower',
          title: '新增新闻',
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/components/form1.vue')
      },

    ]
  },{
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'forms2/:type/:newid',
        name: 'forms2',
        meta: {
          icon: 'md-flower',
          title: '新闻详情',
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/components/form2.vue')
      },

    ]
  },
]
