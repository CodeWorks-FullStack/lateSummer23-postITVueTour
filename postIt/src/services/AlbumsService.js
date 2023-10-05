import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"




class AlbumsService{
  async getAlbumById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator memberCount')
    if(!album){
      throw new BadRequest(`no album at id: ${albumId}`)
    }
    return album
  }
  async getAlbums(query) {
    // NOTE the .sort('-createdAt') sorts the results so newest content comes first
    const albums = await dbContext.Albums.find(query).sort('-createdAt').populate('creator memberCount')
    return albums
  }
  async createAlbum(albumBody) {
    const album = await dbContext.Albums.create(albumBody)
    await album.populate('creator memberCount')
    return album
  }

  async archiveAlbum(albumId, userId) {
    const album = await this.getAlbumById(albumId)
    if(album.creatorId != userId) throw new Forbidden("That's not your purse I don't know you!")

    // album.remove() IF YOU actually wanted to delete it, which in this case we don't
    album.archived = !album.archived // flips the albums archived status
    await album.save() // after the change, save it to the db then return
    return album
  }
}

export const albumsService = new AlbumsService()
