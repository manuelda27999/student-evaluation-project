//Test to login a user
import loginUser from "../logic/loginUser";
import registerUser from "../logic/registerUser";
import { getAuth, signOut } from "firebase/auth";

describe("loginUser", () => {
  afterAll(async () => {
    await signOut(getAuth());
  });

  test("loginUser", async () => {
    const name = "ExampleName";
    const email = `test${Date.now()}@example.com`;
    const password = Math.floor(Math.random() * 1000000).toString();
    const role = "student";

    await registerUser(name, email, password, role);

    const user = await loginUser(email, password);

    expect(user).toBeDefined();
    expect(user?.email).toBe(email);
  });
});
