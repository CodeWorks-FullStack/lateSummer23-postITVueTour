import { AppState } from "../AppState.js"
import { Collaborator } from "../models/Collborator.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"




class CollaboratorsService{
  async createCollab(collabData){
    const res = await api.post('api/collaborators', collabData)
    logger.log('new 🤝', res.data)
    AppState.activeAlbumCollaborators.push(new Collaborator(res.data))
  }

  async removeCollab(collabId){
    const res = await api.delete(`api/collaborators/${collabId}`)
    logger.log('-🤝', res.data)
    let indexToRemove = AppState.activeAlbumCollaborators.findIndex(collab => collab.id == collabId)
    AppState.activeAlbumCollaborators.splice(indexToRemove, 1)
  }
}

export const collaboratorsService = new CollaboratorsService()
