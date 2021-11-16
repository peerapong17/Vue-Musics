<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-container">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <div class="playlist-body">
        <h2>{{ playlist.title }}</h2>
        <div class="description">
          <p>{{ playlist.description }}</p>
          <p>{{ playlist.createdAt.toDate().toDateString() }}</p>
        </div>
        <div class="btn-container">
          <router-link
            :to="{
              name: 'UpdatePlaylist',
              params: { playlist_id: playlist.id },
            }"
          >
            <button class="btn-update" v-if="ownership">
              Update Playlist
            </button>
          </router-link>
          <button
            class="btn-delete"
            v-if="ownership"
            @click="handleDeletePlaylist"
          >
            Delete Playlist
          </button>
        </div>
      </div>
    </div>

    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet.
      </div>
      <SongListView
        v-for="song in playlist.songs"
        :key="song.id"
        :song="song"
        :ownership="ownership"
        :isPending="isPending"
        :canDelete="true"
        @onDeleteSong="handleDeleteSong($event)"
      />
      <AddSong :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import AddSong from "@/components/AddSong.vue";
import SongListView from "@/components/SongListView.vue";
import {
  useStorage,
  useCollection,
  getCollection,
  getUser,
} from "@/composables";

export default {
  props: ["playlistId"],
  components: { AddSong, SongListView },
  setup({ playlistId }) {
    const router = useRouter();
    const { user } = getUser();
    const { deleteImage } = useStorage();
    const { deleteDoc, updateDoc, isPending, error } = useCollection(
      "playlists"
    );
    const { getDoc, document: playlist } = getCollection("playlists");

    getDoc(playlistId);

    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      );
    });

    const handleDeletePlaylist = async () => {
      if (window.confirm("Are you sure?")) {
        await deleteDoc(playlistId);
        await deleteImage(playlist.value.filePath);
        router.push({ name: "Home" });
      }
    };

    const handleDeleteSong = async (id) => {
      console.log(playlist.value.songs)
      if (window.confirm("Are you sure?")) {
        isPending.value = true;
        const songs = playlist.value.songs.filter((song) => song.id != id);
        await updateDoc(playlistId, { songs });
        isPending.value = false;
      }
    };

    return {
      error,
      playlist,
      isPending,
      ownership,
      handleDeleteSong,
      handleDeletePlaylist,
    };
  },
};
</script>

<style scoped>
.playlist-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  margin-bottom: 20px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.playlist-body {
  padding: 0px 7px;
}
.username {
  color: #999;
}
.description {
  display: flex;
  justify-content: space-between;
  margin-bottom: 17px;
}

.btn-container {
  display: flex;
  flex-direction: column;
}
.btn-update {
  margin-bottom: 5px;
  width: 100%;
}
</style>
