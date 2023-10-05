import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { collaboratorsService } from "../services/CollaboratorsService.js";



export class CollaboratorsController extends BaseController{
  constructor(){
    super('api/collaborators')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createCollaborator)
    .delete('/:collaboratorId', this.removeCollaborator)
  }


  async createCollaborator(req, res, next){
    try {
      const collabBody = req.body
      collabBody.accountId = req.userInfo.id
      const collab = await collaboratorsService.createCollaborator(collabBody)
      res.send(collab)
    } catch (error) {
      next(error)
    }
  }

  async removeCollaborator(req, res, next){
    try {
      const message = await collaboratorsService.removeCollaborator(req.params.collaboratorId, req.userInfo.id)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
