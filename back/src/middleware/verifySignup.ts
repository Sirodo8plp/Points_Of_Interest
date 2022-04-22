// import MiddlewareArguments from "src/types/MiddlewareArguments";

// const VerifySignUp = async ({
//   prisma,
//   req,
//   res,
//   next,
// }: MiddlewareArguments) => {
//   const userByUsername = await prisma.user.findUnique({
//     where: {
//       username: req.body.username,
//     },
//   });
//   if (userByUsername) {
//     res.status(400).send({
//       message: "Failed! Username is already in use!",
//     });
//     return;
//   }

//   const userByEmail = await prisma.user.findUnique({
//     where: {
//       email: req.body.email,
//     },
//   });

//   if (userByEmail) {
//     res.status(400).send({
//       message: "Failed! Username is already in use!",
//     });
//     return;
//   }

//   next();
// };

// export default VerifySignUp;
