


export class Picture{
  constructor(data){
    this.id = data.id
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.albumId = data.albumId
    this.creator = data.creator
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}
