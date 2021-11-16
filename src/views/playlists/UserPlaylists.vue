<template>
  <div class="container">
    <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <ListView v-for="playlist in playlists" :key="playlist.id" :playlistId="playlist.id" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create a New Playlist</router-link>
  </div>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import { getCollection } from "@/composables";
import ListView from "@/components/ListView.vue";
import { watch } from '@vue/runtime-core';
import { computed } from '@vue/runtime-core';

export default {
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { getDocs, documents: playlists, isPending } = getCollection(
      "playlists"
    );

    getDocs(["userId", "==", user.value.uid])

    return { playlists, isPending };
  },
};
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
}
.user-playlists {
  width: 50%;
}
h2 {
  padding-bottom: 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--secondary);
}
.btn {
  margin-top: 20px;
}
</style>
