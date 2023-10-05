import { reactive } from 'vue'
import { Album } from './models/Album.js'
import { Collaborator } from './models/Collborator.js'
import { Picture } from './models/Picture.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /**@type {Collaborator[]} */
  myCollaborations: [],


  /**@type {Album[]} */
  albums: [],

  /**@type {Album} */
  activeAlbum: null,
  /**type @type {Picture[]} */
  activeAlbumPictures: [],
  /**@type {Collaborator[]} */
  activeAlbumCollaborators: [],
})
