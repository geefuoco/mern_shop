import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.methods.hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
//using es6 here makes the 'this' be undefined. use function keyword instead
UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default model("User", UserSchema);
