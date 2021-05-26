import mongoose from 'mongoose';

export const connect = (uri) => mongoose.connect(uri, { useNewUrlParser: true });

export default mongoose.connection;
