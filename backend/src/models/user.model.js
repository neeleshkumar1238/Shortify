import { mongoose } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    avatar:{
        type: String,
        requoired: true,
        default:"https://www.gravatar.com/avatar/000000000000000000000000000000?d=identicon"
    },
});

/*function getGravatarUrl(email) {
    const crypto = require('crypto');
    const hash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}*/

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});

userSchema.pre("save", async function (next) {
  console.log("Pre-save hook triggered");
  console.log("Password modified:", this.isModified("password"));
  
  if (!this.isModified("password")) return next();
  
  try {
    this.password = await bcrypt.hash(this.password, 10);
    console.log("Password hashed successfully");
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
});

const User = mongoose.model('User', userSchema);

export default User;