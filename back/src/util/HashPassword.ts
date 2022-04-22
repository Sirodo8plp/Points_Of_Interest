import bcrypt from "bcryptjs";

const HashPassword = (password: string) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};

export default HashPassword;
