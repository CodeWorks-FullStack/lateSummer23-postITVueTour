import { Schema } from "mongoose";



export const AlbumsSchema = new Schema({
  title: {type: String, required: true, maxLength: 20},
  category: {type: String, enum: ['animals', 'pugs', 'games', 'aesthetics', 'misc'], lowercase: true },
  coverImg: {type: String, required: true, maxLength: 500, default: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=700&q=80'},
  archived: {type: Boolean, required: true, default: false},
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true}
}, {timestamps: true, toJSON: {virtuals: true}})


AlbumsSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

AlbumsSchema.virtual('memberCount', {
  localField: '_id', //what is here
  foreignField: 'albumId', // what is on there
  ref: 'Collaborator', // the other thing, the 'there'
  count: true // NOTE creates a number for each of the matching documents. (each collab with an albumId that matches this albums _id)
})
