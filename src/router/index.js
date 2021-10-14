import { createRouter, createWebHashHistory } from "vue-router";
import { middleware as allMiddleware } from "../utils.js"
import notify from '../notify.js'
import PrincipalLayout from "../pages/principal/layout.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/home.vue"),
  },
  {
    path: '/principal',
    component: () =>  import("../pages/principal/layout.vue"),
    children: [
      {
        path: 'home',
        component: ()  => import("../pages/principal/home.vue")
      },
      {
        path: 'invitations',
        component: ()  => import("../pages/principal/invitations.vue")
      },
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
        notify('auth middleware not allowed');
        return false;
      }
    }
  }
  return true;
})

export default router