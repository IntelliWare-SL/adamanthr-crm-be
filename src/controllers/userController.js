import Joi from "joi";
import config from "../config";
import { testService } from "../services/userService";

const testController = async (req, res) => {
  await testService("Hello world");
};

export { testController };
