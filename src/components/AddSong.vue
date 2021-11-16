<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Songs</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <div class="title">
        <h4>Add a New Song</h4>
        <button @click="showForm = false">hide</button>
      </div>
      <input type="text" placeholder="Song title" required v-model="title" />
      <input type="text" placeholder="Artist" required v-model="artist" />
      <input type="file" @change="handleChange" />
      <button v-if="!isPending">Add</button>
      <button v-else disabled>Adding...</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useCollection, useStorage } from "@/composables";
import { timestamp } from "@/firebase/config";

export default {
  props: ["playlist"],
  setup({ playlist }) {
    const title = ref("");
    const artist = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);
    const showForm = ref(false);
    const types = ["image/png", "image/jpeg"];
    const { filePath, url, uploadSongImage } = useStorage();
    const { addDoc } = useCollection("songs");

    const handleSubmit = async () => {
      isPending.value = true;
      await uploadSongImage(file.value);
      const res = await addDoc({
        title: title.value,
        artist: artist.value,
        coverUrl: url.value,
        filePath: filePath.value,
        createdAt: timestamp(),
      });
      isPending.value = false;
      title.value = "";
      artist.value = "";
    };

    const handleChange = (e) => {
      let selected = e.target.files[0];
      console.log(selected);

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    return { title, artist, showForm, handleSubmit, handleChange, isPending };
  },
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
