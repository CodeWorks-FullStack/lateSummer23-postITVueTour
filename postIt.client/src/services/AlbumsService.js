import { AppState } from "../AppState.js"
import { Album } from "../models/Album.js"
import { Collaborator } from "../models/Collborator.js"
import { Picture } from "../models/Picture.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"




class AlbumsService{
async getAlbums(){
  const res = await api.get('api/albums')
  logger.log('📷 got albums', res.data)
  AppState.albums = res.data.map(album => new Album(album))
}

async createAlbum(albumData){
  const res = await api.post('api/albums', albumData)
  logger.log('📷 created album', res.data)
  // NOTE unshift adds the newest item to the start and push to the end (for best use case, consider how your server data is returned)
  const newAlbum = new Album(res.data)
  AppState.albums.unshift(newAlbum)
  // AppState.albums.push(new Album(res.data))
  return newAlbum // this is returned so the vue component has it for a router push
}

async getAlbumById(albumId){
  const res = await api.get(`api/albums/${albumId}`)
  logger.log('📷 got one album', res.data)
  AppState.activeAlbum = new Album(res.data)
}
async getPicturesByAlbumId(albumId){
  const res = await api.get(`api/albums/${albumId}/pictures`)
  logger.log('🖼️ album pictures', res.data)
  AppState.activeAlbumPictures = res.data.map(pic => new Picture(pic))
}
async getCollaboratorsByAlbumId(albumId){
  const res = await api.get(`api/albums/${albumId}/collaborators`)
  logger.log('📷🤝', res.data)
  AppState.activeAlbumCollaborators = res.data.map(collab => new Collaborator(collab))
}
}

export const albumsService = new AlbumsService()
