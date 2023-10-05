import { dbContext } from "../db/DbContext.js"
import { albumsService } from "./AlbumsService.js"



class PicturesService{
  async getPicturesInAlbum(albumId) {
    // NOTE this one line just works as a way to verify that the album you are getting pictures for exists, utilizing a method that already exists in the albumsService
    await albumsService.getAlbumById(albumId)

    // ----------------------------------evaluates to ~ {albumId: '6508ad9dfc8aa7a2279ed892'}
    const pictures = await dbContext.Pictures.find({albumId: albumId}).populate('creator album')
    // const pictures = await dbContext.Pictures.find({albumId}) also valid
    return pictures
  }
  async createPicture(picBody) {
    const picture = await dbContext.Pictures.create(picBody)
    await picture.populate('creator')
    return picture
  }

}

export const picturesService = new PicturesService()
