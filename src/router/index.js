import Vue from 'vue'
import VueRouter from 'vue-router'
import CategoriesView from "@/views/categories/CategoriesView";
import ArticlesView from "@/views/articles/ArticlesView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/categories',
    name: 'Categories',
    component: CategoriesView
  },
  {
    path: '/categories/add',
    name: 'Add Category',
    component: () => import(/* webpackChunkName: "about" */ '../views/categories/AddCategoryView.vue')
  },
  {
    path: '/categories/edit/:id',
    name: 'Edit Category',
    component: () => import(/* webpackChunkName: "about" */ '../views/categories/EditCategoryView.vue')
  },
  {
    path: '/articles',
    name: 'Articles',
    component: ArticlesView
  },
  {
    path: '/articles/add',
    name: 'Add Article',
    component: () => import(/* webpackChunkName: "about" */ '../views/articles/AddArticleView.vue')
  },
  {
    path: '/articles/edit/:id',
    name: 'Edit Article',
    component: () => import(/* webpackChunkName: "about" */ '../views/articles/EditArticleView.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "about" */ '../views/users/UsersView.vue')
  },
  {
    path: '/users/add',
    name: 'Add User',
    component: () => import(/* webpackChunkName: "about" */ '../views/users/AddUserView.vue')
  },
  {
    path: '/users/edit/:email',
    name: 'Edit User',
    component: () => import(/* webpackChunkName: "about" */ '../views/users/EditUserView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login') {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      next({name: 'Login'});
      return;
    }

    if(to.name.includes('User')){
      let claims = parseJwt(jwt);

      if(claims.type !== 'Admin'){
        alert("Unauthorized access.")
        return;
      }
    }

    const payload = JSON.parse(atob(jwt.split('.')[1]));
    const expDate = new Date(payload.exp * 1000);
    if (expDate < new Date()) {
      next({name: 'Login'});
      return;
    }
  }

  next();
});

function parseJwt (token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export default router
