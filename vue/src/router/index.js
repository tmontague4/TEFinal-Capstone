import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import AddPet from '../views/AddPet.vue'
import PlayDates from '../views/PlayDates.vue'
import FileUpload from '../components/FileUpload.vue'
import ScheduledPlayDatesDetail from '../components/ScheduledPlayDatesDetail.vue'
import MapView from '../views/MapView.vue'
import AvailablePlayDates from '../views/AvailablePlayDates.vue'
import UserProfile from '../views/UserProfile.vue'
import EditPet from '../views/EditPet.vue'


Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/addpet",
      name: "addpet",
      component: AddPet,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/playdates",
      name: "playdates",
      component: PlayDates,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/fileupload",
      name: "fileupload",
      component: FileUpload,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/map",
      name: "map",
      component: MapView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/playdatedetail",
      name: "playdate-detail",
      component: ScheduledPlayDatesDetail,
      meta: {
        requiresAuth: true
      }
    },
      {
      path: "/availableplaydate",
      name: "available-playDates",
      component: AvailablePlayDates,
      meta: {
        requiresAuth: true
      }
      
    },
    {
      path: "/userprofile",
      name: "user-profile",
      component: UserProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/editpet",
      name: "edit-pet",
      component: EditPet,
      meta: {
        requiresAuth: true
      }
    },

    
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
