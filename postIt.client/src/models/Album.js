

export class Album{
  constructor(data){
    this.id = data.id
    this.title = data.title,
    this.category = data.category
    this.coverImg = data.coverImg
    this.archived = data.archived
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.memberCount = data.memberCount
    this.isAlbum = 'this is a classed album'
  }
}
