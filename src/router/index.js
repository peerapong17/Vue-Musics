import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import ConfirmEmail from "../views/auth/ConfirmEmail.vue";
import CreatePlaylist from "../views/playlists/CreatePlaylist.vue";
import UpdatePlaylist from "../views/playlists/UpdatePlaylist.vue";
import PlaylistDetails from "../views/playlists/PlaylistDetails.vue";
import UserPlaylists from "../views/playlists/UserPlaylists.vue";
import AddSong from "../views/playlists/AddSong.vue";

// route guard
import { projectAuth } from "../firebase/config";

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/confirm-email",
    name: "ConfirmEmail",
    component: ConfirmEmail,
  },
  {
    path: "/playlists/create",
    name: "CreatePlaylist",
    component: CreatePlaylist,
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/update/:playlist_id",
    name: "UpdatePlaylist",
    component: UpdatePlaylist,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/:playlistId",
    name: "PlaylistDetails",
    component: PlaylistDetails,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/user",
    name: "UserPlaylists",
    component: UserPlaylists,
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/add/song/:songId",
    name: "AddSong",
    component: AddSong,
    props: true,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
