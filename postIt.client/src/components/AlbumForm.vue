<template>
    <div class="container-fluid">
      <form class="row" @submit.prevent="createAlbum">

        <div class="mb-1 col-6">
          <label for="album-title">Title</label>
          <input v-model="albumData.title" id="album-title" class="form-control" type="text" minlength="5" maxlength="20" placeholder="title of album" required>
        </div>
        <div class="mb-1 col-6">
          <label for="album-category">Category</label>
          <select v-model="albumData.category" class="form-control" id="album-category" required>
            <option disabled selected value="">please select a category</option>
            <option value="animals">animals</option>
            <option value="pugs">pugs</option>
            <option value="games">games</option>
            <option value="aesthetics">aesthetics</option>
            <option value="misc">misc</option>
          </select>
        </div>
        <div class="mb-1 col-12">
          <label for="album-cover">Cover Image</label>
          <input v-model="albumData.coverImg" id="album-cover" class="form-control" type="url" minlength="5" maxlength="500" placeholder="url of cover image" required>
        </div>
        <div class="mb-1 col-12">
          <img class="img-fluid preview-image" :src="albumData.coverImg" alt="">
        </div>
        <div class="col-12 text-end">
          <button class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { albumsService } from '../services/AlbumsService.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
export default {
  setup(){
    const albumData = ref({})
    const router = useRouter()
    function resetForm(){
      albumData.value = {category: ''}
    }
    onMounted(()=>{
      resetForm()
    })
  return {
    albumData,
    async createAlbum(){
      try {
        // NOTE getting the new Album back from a return in the service layer
        let newAlbum = await albumsService.createAlbum(albumData.value) // sends form data to service to create
        Pop.toast('Album Created', 'success') // tells the user good job
        resetForm() // resets the form
        Modal.getOrCreateInstance('#create-album').hide() // closes the modal
        router.push({name: 'Album Details', params: {albumId: newAlbum.id}})
      } catch (error) {
        Pop.error(error)
      }
    }
   }
  }
};
</script>


<style lang="scss" scoped>
.preview-image{
  max-height: 15vh;
  object-fit: contain;
}
</style>
