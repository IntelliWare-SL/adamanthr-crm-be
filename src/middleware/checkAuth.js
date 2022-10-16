// import { verify } from "jsonwebtoken";
// import config from "../config";
//
// const checkToken = (req, res, next) => {
//   let token = req.get("authorization");
//   if (token) {
//     token = token.slice(7);
//     verify(token, config.jwtPrivateKey, (error, decoded) => {
//       if (error) {
//         res.status(401).send({ message: error.message });
//       } else {
//         req.user = decoded.result;
//         delete req.user.password;
//         next();
//       }
//     });
//   } else {
//     res.status(401).send({ message: "Access denied ! No token" });
//   }
// };
//
// export default checkToken;
