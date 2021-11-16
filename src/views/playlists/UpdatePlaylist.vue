<template>
  <div v-if="playlist" class="container">
    <div class="row">
      <div class="col">
        <img class="coverUrl" :src="image" />
        <form @submit.prevent="handleSubmit">
          <h4>Create a New Playlist</h4>
          <input
            type="text"
            required
            placeholder="Playlist title"
            v-model="title"
          />
          <textarea
            required
            placeholder="Playlist description..."
            v-model="description"
          ></textarea>
          <!-- upload playlist image -->
          <label>Upload Playlist Cover Image</label>
          <input type="file" @change="handleChange" />
          <div v-if="error || fileError" class="error">{{ fileError }}</div>

          <button v-if="!isPending">Create</button>
          <button v-else disabled>Saving...</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { getCollection, useCollection, useStorage } from "@/composables";
import { useRouter } from "vue-router";

export default {
  props: { playlist_id: String },
  setup({ playlist_id }) {
    const title = ref("");
    const image = ref("");
    const description = ref("");
    const router = useRouter();

    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);
    const { filePath, url, uploadImage, deleteImage } = useStorage();
    const { getDoc, document: playlist } = getCollection("playlists");
    const { updateDoc, error } = useCollection("playlists");

    getDoc(playlist_id);

    watchEffect(() => {
      if (playlist.value != null) {
        title.value = playlist.value.title;
        description.value = playlist.value.description;
        image.value = playlist.value.coverUrl;
      }
    });

    const handleSubmit = async () => {
      isPending.value = true;
      if (file.value) {
        await uploadImage(file.value);
        await deleteImage(playlist.value.filePath);
        await updateDoc(playlist_id, {
          title: title.value,
          description: description.value,
          coverUrl: url.value,
          filePath: filePath.value,
        });
      } else {
        await updateDoc(playlist_id, {
          title: title.value,
          description: description.value,
        });
      }
      isPending.value = false;

      if (!error.value) {
        router.push({
          name: "PlaylistDetails",
          params: { playlistId: playlist_id },
        });
      }
    };

    // allowed file types
    const types = ["image/png", "image/jpeg"];

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

    return {
      title,
      description,
      image,
      playlist,
      handleSubmit,
      fileError,
      handleChange,
      isPending,
      error,
    };
  },
};
</script>

<style scope>
.row {
  display: flex;
  justify-content: center;
}

.col {
  display: flex;
  width: 80%;
}
.coverUrl {
  width: 35%;
  height: 270px;
  border-radius: 5px;
}

form {
  background: white;
  width: 65%;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
</style>
