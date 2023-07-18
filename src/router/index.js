import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/MyLogin.vue'
import MyHome from '@/views/MyHome.vue'
import pathArr from '@/router/pathArr'
import Home from '@/views/home/Home'
import ArticleDeatail from '@/views/articledetail/ArticleDetail'
import Admin from '@/views/Administrator'
import AdminUserContent from '@/views/userManage/AdminUserContent'
import AdminHome from '@/views/adminhome/AdminHome'
import User from '@/views/user/User'
import UserContent from '@/views/user/UserContent'
import UserHome from '@/views/user/UserHome'
import UserAdd from '@/views/user/UserAdd'
import UserCheck from '@/views/user/UserCheck'
import AdminArticle from '@/views/articleManage/AdminArticle'
import BooksList from '@/views/book/BooksList'
import BookHome from '@/views/book/BookHome'
import HomeLayout from '@/views/home/HomeLayout'
import BookDetail from '@/views/book/BookDetail'
import Orders from '@/views/order/Orders'
import Cart from '@/views/user/Cart'
import AdminOrder from '@/views/orderManage/AdminOrder'
import Sensitive from '@/views/articleManage/Sensitive'
import Ground from '@/views/orderManage/AdminGround'
import Chat from '@/views/chatManage/Chat'
import UserChat from '@/views/user/UserChat'
import UserFollow from '@/views/user/UserFollow'
import AdminArticleList from '@/views/articleManage/AdminArticleList'
import ArticleDeailLayout from '@/views/articledetail/ArticleDetailLayout'

//
Vue.use(VueRouter)

const router = new VueRouter(
  {
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{ path: '/', redirect: './home' },

      //
      { path: '/login', component: Login },
      {
        path: '/home',
        redirect: '/home/home',
        component: MyHome,
        children: [{
          path: 'books',
          redirect: 'books/home',
          components: { content2: BookHome },
          children: [{
            path: '/home/books/home',
            components: {
              bookcontent: BooksList
            }
          }, {
            path: '/home/books/bookdetail/:bid',
            components: {
              bookcontent: BookDetail
            },
            props: { bookcontent: true }
          }

          ]
        },
        // 详情页路由规则，跳转不加冒号规则里才有
        {
          path: 'users',
          redirect: 'users/home',
          components: { content2: User },
          children: [{
            path: '/home/users/mycomment',
            components: {
              usercontent: UserContent
            }
          },
          {
            path: '/home/users/home',
            components: {
              usercontent: UserHome
            }
          }, {
            path: '/home/users/add',
            components: {
              usercontent: UserAdd
            }
          }, {
            path: '/home/users/check',
            components: {
              usercontent: UserCheck
            }
          },
          {
            path: '/home/users/cart',
            components: {
              usercontent: Cart
            }
          }, {
            path: '/home/users/userchat',
            components: {
              usercontent: UserChat
            }
          }, {
            path: '/home/users/userfollow',
            components: {
              usercontent: UserFollow
            }
          }]
        },
        {
          path: 'home',
          redirect: 'home/myhome',
          components: { content2: HomeLayout },
          children: [{
            path: '/home/home/myhome',
            components: {
              homecontent: Home
            }
          }
          ]
        },
        { path: 'orders', components: { content2: Orders } },
        // {
        //   path: 'detail/:id',
        //   components: { content1: ArticleDeatail, nav1: DetailMessage },
        //   props: { nav1: true, content1: true }
        // }
        {
          path: 'ArticleDetail',
          components: { content2: ArticleDeailLayout },
          children: [{
            path: '/home/ArticleDetail/detail',
            name: 'details',
            components: {
              ArticleContent: ArticleDeatail,
              props: { nav1: true, content2: true, ArticleContent: true }
            }
          }]
        }
        ]
      },
      {
        path: '/Administrator',
        redirect: '/Administrator/home',
        component: Admin,
        children: [
          { path: 'home', components: { acontent: AdminHome } },
          { path: 'orders', components: { acontent: AdminOrder } },
          { path: 'chat', components: { acontent: Chat } },
          { path: 'articles', components: { acontent: AdminArticle } },
          { path: 'articleLists', components: { acontent: AdminArticleList } },
          { path: 'sensitive', components: { acontent: Sensitive } },
          { path: 'ground', components: { acontent: Ground } },
          { path: 'users', components: { acontent: AdminUserContent } }

        ]
      }

    ]
  }
)
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  // 兼容chrome
  document.body.scrollTop = 0
  // 兼容firefox
  document.documentElement.scrollTop = 0
  // 兼容safari
  window.pageYOffset = 0

  // 将所有的需要权限的页面的hash地址存在数组中，再判断
  // pathArr.indexOf(to.path) !== -1,看看to.path要去的地址有没有再数组中
  // 在就不放行，不在就放行
  // const pathArr = ['/home', '/home/users', '/home/right']
  if (pathArr.indexOf(to.path) !== -1) {
    const token = sessionStorage.getItem('token')
    console.log(token)
    if (token) {
      next()
    } else {
      next(from.path)
      alert('请先登录')
    }
  } else {
    next()
  }
})

export default router
