import { verify } from "jsonwebtoken";

const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    verify(token, process.env.JWT_PRIVATE_KEY, (error, decoded) => {
      if (error) {
        res.status(401).send({ message: error.message });
      } else {
        req.user = decoded.result;
        delete req.user.password;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Access denied ! No token" });
  }
};

export default checkToken;
