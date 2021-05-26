import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
    name: String,
    slug: String,
    description: String,
});

/*
locationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
});
 */

export default mongoose.model('Location', locationSchema);
