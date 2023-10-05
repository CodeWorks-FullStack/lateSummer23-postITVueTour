import { AppState } from "../AppState.js"
import { Picture } from "../models/Picture.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"




class PicturesService{
  async createPicture(pictureData){
    const res = await api.post('api/pictures', pictureData)
    logger.log('added 🖼️', res.data)
    AppState.activeAlbumPictures.push(new Picture(res.data))
  }

}

export const picturesService = new PicturesService()
