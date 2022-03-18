import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent' },
    body: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }

},
{ timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
  })