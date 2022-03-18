import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverImg: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, enum: ['CONCERT', 'CONVENTION', 'SPORT', 'DIGITAL'], uppercase: true, default: 'CONCERT'  },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }



},
{ timestamps: true, toJSON: { virtuals: true } }
)

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
  })
  