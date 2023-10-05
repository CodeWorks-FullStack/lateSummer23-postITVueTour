import { Schema } from "mongoose";
import { logger } from "../utils/Logger.js";



export const PictureSchema = new Schema({
  imgUrl: {type: String, required: true, maxLength: 500},
  creatorId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
  albumId: {type: Schema.Types.ObjectId, ref: 'Album', required:true}
}, {timestamps: true, toJSON: {virtuals: true}})

PictureSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

PictureSchema.virtual('album', {
  justOne: true,
  foreignField: 'album',
  localField: 'albumId',
  ref: 'Album'
})
