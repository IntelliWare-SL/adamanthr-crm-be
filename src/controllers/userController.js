import { testService } from "../services/userService";

const testController = async (req, res) => {
  // await testService("Hello world");
  res.status(200).send("Hello world")
};

export { testController };
