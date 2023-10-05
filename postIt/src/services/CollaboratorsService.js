import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class CollaboratorsService{
  async createCollaborator(collabBody) {
    const collab = await dbContext.Collaborators.create(collabBody)
    await collab.populate('album')
    await collab.populate('profile', '-email')
    return collab
  }

  async getCollaboratorsOnAlbum(albumId) {
    const collabs = await dbContext.Collaborators.find({albumId}).populate('profile', '-email')
    return collabs
  }
  async getCollaborationsByAccount(userId) {
    // const collabs = await dbContext.Collaborators.find({accountId: userId}).populate('album')
    // NOTE this populates the album onto the collaborator THEN the creator and memberCount onto the virtual album.
    // collab > album > creator & memberCount
    const collabs = await dbContext.Collaborators.find({accountId: userId}).populate({path: 'album', populate: {path: 'creator memberCount', select: '-email'}})
    return collabs
  }
  async removeCollaborator(collaboratorId, userId) {
    const collab = await dbContext.Collaborators.findById(collaboratorId).populate('album profile')

    // REVIEW fail first
    if(!collab) throw new BadRequest(`you dawg this ain't here. Id: ${collaboratorId}`)

    if(userId != collab.accountId) throw new Forbidden(`You shall not pass!`)

    // REVIEW if you don't fail continue process
    await collab.remove()

    // @ts-ignore
    return `Friendship ended between ${collab.album.title} and ${collab.profile.name}.`
  }
}

export const collaboratorsService = new CollaboratorsService()
