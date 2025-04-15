import registerUser from "../logic/registerUser";
import { getAuth, signOut } from "firebase/auth";

describe("registerUser", () => {
  afterAll(async () => {
    await signOut(getAuth());
  });

  test("register a new user", async () => {
    const name = "ExampleName";
    const email = `test${Date.now()}@example.com`;
    const password = Math.floor(Math.random() * 1000000).toString();
    const role = "student";

    const user = await registerUser(name, email, password, role);

    expect(user).toBeDefined();
    expect(user?.email).toBe(email);
  });
});
