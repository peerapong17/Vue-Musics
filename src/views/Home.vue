<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <template v-if="documents">
      <div class="container" >
        <SongListView v-for="song in documents" :key="song.id" :song="song" :canDelete="false" />
      </div>
    </template>
  </div>
</template>

<script>
import SongListView from "../components/SongListView.vue";
import { getCollection } from "@/composables";

export default {
  name: "Home",
  components: { SongListView },
  setup() {
    const { getDocs, error, documents } = getCollection("songs");

    getDocs();

    return { error, documents };
  },
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
}

.container {
  width: 60%;
}

</style>
