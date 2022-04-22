import bcrypt from "bcryptjs";
const saltRounds = 10;

const DecryptPassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

export default DecryptPassword;
