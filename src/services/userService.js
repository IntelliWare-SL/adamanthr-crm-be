import { insertUser } from "../repositories/userRepository";

const testService = async (message) => {
  await testRepo(message);
};

export { testService };
