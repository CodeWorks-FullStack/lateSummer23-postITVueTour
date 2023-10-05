<template>
  <div class="container">

    <!-- NOTE provide an id for the HTML element we want the step to render to  -->
    <section class="row" id="v-step-0">
      <!-- {{ myCollaborations }} -->
      <div v-for="collab in myCollaborations" :key="collab.id" class="col-6 col-md-2">
        <AlbumCard :album="collab.album" />
      </div>
    </section>

    <!-- STUB filter bar -->
    <section class="row bg-info gap-2 p-2 rounded my-2">
      <!-- NOTE changing the ref value here recomputes the album computed -->
      <!-- <div class="col-12 bg-info d-flex p-2 rounded justify-content-between"> -->
      <button class="btn col btn-outline-light" @click="filterBy = ''">All</button>
      <button class="btn col btn-outline-light" @click="filterBy = 'animals'">Animals</button>
      <button class="btn col btn-outline-light" @click="filterBy = 'pugs'">Pugs</button>
      <button class="btn col btn-outline-light" @click="filterBy = 'games'">Games</button>
      <button class="btn col btn-outline-light" @click="filterBy = 'aesthetics'">Aesthetics</button>
      <button class="btn col btn-outline-light" @click="filterBy = 'misc'">Misc</button>
      <!-- </div> -->
    </section>

    <!-- STUB album cards -->
    <section class="row g-4" id="v-step-1">

      <div v-for="a in albums" :key="a.id" class="col-6 col-md-3">
        <!-- {{ a.title }} {{ a.creator.name }} -->
        <AlbumCard :album="a" />
      </div>

    </section>
  </div>

  <!-- NOTE original v-tour component  -->
  <!-- <v-tour v-if="account.needsTour" name="myTour" :steps="steps" :callbacks="tourCallBacks"></v-tour> -->
  <!-- NOTE OUR tour component -->
  <!-- NOTE abstracting allows more control over the mounting of this component -->
  <Tour v-if="account.needsTour" :steps="steps" :callbacks="tourCallBacks" />
</template>

<script>
import { computed, nextTick, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { albumsService } from '../services/AlbumsService.js'
import { AppState } from '../AppState.js'
import AlbumCard from '../components/AlbumCard.vue';
import { accountService } from '../services/AccountService.js';
import { useRouter } from 'vue-router';

export default {
  setup() {

    onMounted(() => {
      getAlbums();
      // FIXME DO NOT GET THE ACCOUNTS INFO ON LOAD OF A PAGE
      // getMyCollaborations()
    });
    const filterBy = ref('')
    const router = useRouter()
    async function getAlbums() {
      try {
        await albumsService.getAlbums();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    // async function getMyCollaborations(){
    //   try {
    //     await accountService.getMyCollaborations()

    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }
    return {
      filterBy,

      // NOTE create an array of steps to pass as a prop to our tour component
      // NOTE tour component iterates through this array to render ea. step component 
      steps: [
        {
          // NOTE targets HTML elem; uses querySelector under the hood
          target: '#v-step-0',
          // NOTE title of pop-up
          header: { title: 'Welcome to PostIt!' },
          // NOTE body of popup....you can write HTML here
          content: "Let's have a look around!",
          // NOTE additional params to adjust placement...refer to popper.js for accepted values
          params: { placement: 'top' }
        },
        {
          target: '#v-step-1',
          header: { title: 'View an Album' },
          content: "Click on a card to view its details."
        }
      ],

      // NOTE callbacks object...here we can add callback functions for the tour 
      tourCallBacks: {
        onFinish: (() => {
          router.push({ name: 'Album Details', params: { albumId: AppState.albums[0].id } })
        }),
        onSkip: (async () => {
          await accountService.editAccount({ needsTour: false })
        })
      },

      account: computed(() => AppState.account),
      albums: computed(() => {
        // NOTE computeds can be multi-line but then need explicit returns
        if (!filterBy.value) {
          return AppState.albums
        } else {
          return AppState.albums.filter(album => album.category == filterBy.value)
        }
      }),
      myCollaborations: computed(() => AppState.myCollaborations)
    };
  },
  components: { AlbumCard },

  // mounted: function () {
  //   this.$tours['myTour'].start()
  // }

}
</script>

<style scoped lang="scss"></style>
