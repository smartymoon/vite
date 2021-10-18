import { createRouter, createWebHashHistory } from "vue-router";
import { middleware as allMiddleware, Role } from "../utils.js"
import PrincipalLayout from "../pages/principal/layout.vue"
import store from "../store.js";
import Message from '../notify.js'

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: to => {
      if (store.getters.role === Role.Principal) {
        return '/principal/home'
      }
      if (store.getters.role === Role.Normal) {
        return '/normal/home'
      }
      if (store.getters.role === Role.Student) {
        return '/student/home'
      }
      return '/login'
    },
  },
  {
    path: '/principal',
    component: () =>  import("../pages/layout.vue"),
    meta: {
      middleware: 'principal'
    },
    children: [
      {
        path: 'home',
        component: ()  => import("../pages/principal/home.vue")
      },
      {
        path: 'invitations',
        component: ()  => import("../pages/principal/invitations.vue")
      },
      {
        path: 'admin-message',
        component: ()  => import("../pages/admin/message.vue")
      }
    ]
  },
  {
    path: '/normal',
    component: () =>  import("../pages/layout.vue"),
    meta: {
      middleware: 'normal'
    },
    children: [
      {
        path: 'home',
        component: ()  => import("../pages/normal/home.vue"),
        props: route => ({
          chat_user_id: route.query.chat_user_id,
          chat_user_name: route.query.chat_user_name,
        })
      },
      {
        path: 'admin-message',
        component: ()  => import("../pages/admin/message.vue")
      }
    ]
  },
  {
    path: '/student',
    component: () =>  import("../pages/layout.vue"),
    meta: {
      middleware: 'student'
    },
    children: [
      {
        path: 'home',
        component: ()  => import("../pages/student/home.vue"),
        props: route => ({
          chat_user_id: route.query.chat_user_id,
          chat_user_name: route.query.chat_user_name,
        })
      },
      {
        path: 'admin-message',
        component: ()  => import("../pages/admin/message.vue")
      }
    ]
  },
  {
    name: 'login',
    path: "/login",
    component: () => import("../pages/login.vue"),
    meta: {
      middleware: 'guest'
    }
  },
  {
    path: "/register",
    component: () => import("../pages/register.vue"),
    meta: {
      middleware: 'guest'
    }
  },
  {
    path: "/line/login",
    component: () => import("../pages/lineLogin.vue"),
    meta: {
      middleware: 'guest'
    }
  },
  {
    path: '/invitation',
    component: ()  => import("../pages/principal/invitation_detail.vue")
  }
];

    
const router =  createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  let routerMiddleware = to.meta.middleware
  if (routerMiddleware) {
    if ((typeof routerMiddleware) === 'string') {
      routerMiddleware = [routerMiddleware]
    }
    for(let middleware of routerMiddleware) {
      if (!allMiddleware[middleware]()) {
        Message.fail('auth middleware not allowed');
        return from;
      }
    }
  }
  return true;
})

export default router