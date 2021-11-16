<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div
          class="single"
          v-for="playlist in playlists"
          :key="playlist.id"
          @click="onSelectPlaylist(playlist.id)"
        >
          <div class="thumbnail">
            <img :src="playlist.coverUrl" />
          </div>
          <div class="info">
            <h3>{{ playlist.title }}</h3>
            <p>{{ playlist.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { getCollection, useCollection, getUser } from "@/composables";
export default {
  props: { songId: String },
  setup({ songId }) {
    const { user } = getUser();
    const router = useRouter();
    const { updateDoc } = useCollection("playlists");
    const { getDocs, documents: playlists, isPending } = getCollection(
      "playlists"
    );

    const { getDoc, document: doc } = getCollection("songs");

    getDocs(["userId", "==", user.value.uid]);

    getDoc(songId);

    const onSelectPlaylist = async (playlistId) => {
      console.log(songId);
      console.log(playlistId);
      console.log(doc.value);
      console.log(playlists);
      isPending.value = true;
      playlists.value.map(async (playlist) => {
        if (playlist.id == playlistId) {
          await updateDoc(playlistId, {
            songs: [...playlist.songs, doc.value],
          });
        }
      });
      router.push({
        name: "PlaylistDetails",
        params: { playlistId: playlistId },
      });

      isPending.value = false;
    };

    return { playlists, onSelectPlaylist };
  },
};
</script>

<style scope>
.col {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.single {
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 7px;
  background: white;
  transition: all ease 0.2s;
  width: 100%;
  margin-bottom: 15px;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.thumbnail {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 7px;
}
img {
  max-width: 150%;
  max-height: 150%;
  display: block;
}
.info {
  margin: 0 30px;
}
.song-number {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
