import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { albumsService } from "../services/AlbumsService.js";
import { picturesService } from "../services/PictursService.js";
import { collaboratorsService } from "../services/CollaboratorsService.js";



export class AlbumsController extends BaseController{
  constructor(){
    super('api/albums')
    this.router
    .get("", this.getAlbums)
    .get('/:albumId', this.getAlbumById)
    .get('/:albumId/pictures', this.getPicturesInAlbum)
    .get('/:albumId/collaborators', this.getCollaboratorsOnAlbum)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createAlbum)
    .delete('/:albumId', this.archiveAlbum)

  }

  async getAlbums(req, res, next){
    try {
      const albums = await albumsService.getAlbums(req.query)
      res.send(albums)
    } catch (error) {
      next(error)
    }
  }

  async getAlbumById(req, res, next){
    try {
      const album = await albumsService.getAlbumById(req.params.albumId)
      res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async getPicturesInAlbum(req, res, next){
    try {
      const pictures = await picturesService.getPicturesInAlbum(req.params.albumId)
      res.send(pictures)
    } catch (error) {
      next(error)
    }
  }

  async getCollaboratorsOnAlbum(req, res, next){
    try {
      const collabs = await collaboratorsService.getCollaboratorsOnAlbum(req.params.albumId)
      res.send(collabs)
    } catch (error) {
      next(error)
    }
  }

  async createAlbum(req, res, next){
    try {
      let albumBody = req.body
      albumBody.creatorId = req.userInfo.id
      const album = await albumsService.createAlbum(albumBody)
      res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async archiveAlbum(req, res, next){
    try {
      const album= await albumsService.archiveAlbum(req.params.albumId, req.userInfo.id)
      res.send(album)
    } catch (error) {
      next(error)
    }
  }
}
