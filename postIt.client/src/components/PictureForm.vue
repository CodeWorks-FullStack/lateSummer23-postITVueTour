<template>
  <div class="container-fluid">
    <form @submit.prevent="createPicture" class="row justify-content-center">
      <div class="mb-1 col-12">
        <label for="picture-imageUrl">Image Url</label>
        <input v-model="pictureData.imgUrl" type="url" class="form-control" maxlength="500" minlength="6" required>
      </div>
      <div class="mb-1 col-5">
        <label for="picture-imageUrl">Preview</label>
        <img class="img-fluid" :src="pictureData.imgUrl" alt="">
      </div>
      <button class="btn btn-success">Add picture<i class="mdi mdi-image-plus"></i></button>
    </form>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { useRoute } from 'vue-router';
import {picturesService} from '../services/PicturesService.js'
import { Modal } from 'bootstrap';
export default {
  setup(){
    const pictureData = ref({})
    const route = useRoute()
  return {
    pictureData,
    async createPicture(){
      try {
        logger.log(pictureData.value, AppState.activeAlbum.id, route.params.albumId)
        pictureData.value.albumId = route.params.albumId // assigns the album's id to the pictureData
        // NOTE we need to send ONE object with all the data included on it. not separate pieces of info
        await picturesService.createPicture(pictureData.value)
        Pop.toast('Added picture', 'success', 'center-end')
        pictureData.value = {}
        Modal.getOrCreateInstance('#create-picture').hide()
      } catch (error) {
        Pop.error(error)
      }
    }
   }
  }
};
</script>


<style lang="scss" scoped>

</style>
