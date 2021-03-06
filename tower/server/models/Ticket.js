import { Schema } from "mongoose";

export const TicketSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent' },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

TicketSchema.index({ eventId: 1, accountId: 1 }, { unique: true })

  TicketSchema.virtual('towerevent', {
    localField: 'eventId',
    foreignField: '_id',
    ref: 'TowerEvent',
    justOne: true
  })

  TicketSchema.virtual('creator', {
    localField: 'accountId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
  })