import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
    lowercase: true, 
  },
  password: {
    type: String,
    required: true,
  },
},
{
    timestamps : true,
});

const User = mongoose.model('User', userSchema);

export default User;