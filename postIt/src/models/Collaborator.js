import {Schema} from 'mongoose'
const ObjectId = Schema.Types.ObjectId



export const CollaboratorSchema = new Schema({
  accountId: {type: ObjectId, required: true, ref: 'Account'},
  albumId: {type: ObjectId, required: true, ref: 'Album'}
}, {toJSON: {virtuals: true}})

CollaboratorSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

CollaboratorSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id',
  ref: 'Album',
  justOne: true
})
