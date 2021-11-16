<template>
  <div v-if="playlist">
    <router-link
    :to="{ name: 'PlaylistDetails', params: { playlistId: playlist.id } }"
  >
    <div class="single">
      <div class="thumbnail">
        <img :src="playlist.coverUrl" />
      </div>
      <div class="info">
        <h3>{{ playlist.title }}</h3>
        <p>{{ playlist.description }}</p>
      </div>
      <div class="song-number">
        <p style="marginBottom: 20px">{{ playlist.songs.length }} songs</p>
        <svg
          @click.prevent.stop="addLike"
          width="30"
          focusable="false"
          data-prefix="fas"
          data-icon="thumbs-up"
          class="svg-inline--fa fa-thumbs-up fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            :fill="isLiked ? '#39dbf7' : '#000000'"
            d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
          ></path>
        </svg>
      </div>
    </div>
  </router-link>
  </div>
</template>

<script>
import { getCollection, useCollection, getUser } from "@/composables";
import { computed } from "@vue/runtime-core";
import { watch } from "@vue/runtime-core";
export default {
  props: ["playlistId"],
  setup({ playlistId }) {
    const { updateDoc } = useCollection("playlists");
    const { getDoc, document: playlist, isPendind, error } = getCollection(
      "playlists"
    );
    const { user } = getUser();

    getDoc(playlistId);

    watch(
      () => playlist.value,
      (newVal, oldVal) => {
        console.log(newVal);
        console.log(oldVal)
      }
    );

    const isLiked = computed(() => {
      return user.value.uid && playlist.value.likes.includes(user.value.uid);
    });

    const addLike = async () => {
      if (playlist.value.likes.length > 0) {
        if (isLiked) {
          const likes = playlist.value.likes.filter(
            (like) => like !== user.value.uid
          );
          await updateDoc(playlist.value.id, { likes });
        } else {
          const likes = [...playlist.value.likes, user.value.uid];
          await updateDoc(playlist.value.id, { likes });
        }
      } else {
        const likes = [...playlist.value.likes, user.value.uid];
        await updateDoc(playlist.value.id, { likes });
      }
    };

    return { addLike, isLiked, playlist };
  },
};
</script>

<style scoped>
.single {
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 7px;
  background: white;
  transition: all ease 0.2s;
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

.fa-thumbs-up {
  transition: all ease 0.2;
}

.fa-thumbs-up:hover {
  transform: scale(1.1);
  transition: all ease 0.2;
}
</style>
