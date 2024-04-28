import { Schema, model } from 'mongoose';

const CheckInOutSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
        index: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    checkType: {
        type: String,
        enum: ['IN', 'OUT'],
        required: true
    }
});

const CheckInOut = model('CheckInOut', CheckInOutSchema);

export default CheckInOut;
