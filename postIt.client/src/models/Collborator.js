import { Album } from "./Album.js"



export class Collaborator{
  constructor(data){
    this.id = data.id
    this.albumId = data.albumId
    this.accountId = data.accountId
    this.album = data.album ? new Album(data.album) : null // Be careful with cascading class construction.
    this.profile = data.profile
  }
}
