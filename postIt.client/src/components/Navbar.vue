<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="fw-bold">
        Post It <i class="mdi mdi-film"></i>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse p-2 rounded " id="navbarText">
      <ul class="navbar-nav me-auto">
        <ModalWrapper id="create-album" v-if="user.isAuthenticated">
          <template #button>
            <i class="mdi mdi-plus-box"></i> Create Album
          </template>

          <template #body>
            <AlbumForm/>
          </template>
        </ModalWrapper>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Login from './Login.vue';
import ModalWrapper from './ModalWrapper.vue';
export default {
  setup() {
    return {
      user: computed(()=> AppState.user)
    }
  },
  components: { Login, ModalWrapper }
}
</script>

<style scoped>

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
