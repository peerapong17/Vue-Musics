<template>
  <router-link :to="{ name: 'AddSong', params: { songId: song.id } }">
    <div class="single-song">
      <div class="song-card">
        <img :src="song.coverUrl" />
        <div class="song-desc">
          <h2>{{ song.title }}</h2>
          <p>{{ song.artist }}</p>
        </div>
        <div class="spacer"></div>
        <button v-if="canDelete" class="btn-delete" @click.prevent="$emit('onDeleteSong', song.id)">Delete</button>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: { song: Object, canDelete: Boolean },
  emits: ['onDeleteSong'],
  setup({ song, canDelete }) {
    return { song, canDelete };
  },
};
</script>

<style scope>
h2 {
  text-align: left;
  margin-bottom: 5px;
}

.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  border-radius: 3px;
  background: white;
  margin-bottom: 20px;
  transition: all ease 0.2s;
}
.single-song:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}

.song-card {
  display: flex;
  width: 100%;
  align-items: center;
  margin: 0px 10px;
}

.song-desc {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.song-card img {
  border-radius: 5px;
  width: 80px;
  height: 80px;
}

.spacer{
  flex-grow:1;
}
</style>
