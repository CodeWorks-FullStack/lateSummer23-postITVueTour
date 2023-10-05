import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { picturesService } from "../services/PictursService.js";



export class PicturesController extends BaseController{
  constructor(){
    super('api/pictures')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createPicture)
  }

  async createPicture(req, res, next){
    try {
      const picBody = req.body
      picBody.creatorId = req.userInfo.id
      const picture = await picturesService.createPicture(picBody)
      res.send(picture)
    } catch (error) {
      next(error)
    }
  }
}
