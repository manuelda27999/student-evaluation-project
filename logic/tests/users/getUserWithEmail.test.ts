//Test to login a user
import getUserWithEmail from "../logic/getUserFromStore";
import registerUser from "../../users/registerUser";
import { getAuth, signOut } from "firebase/auth";

describe("getUser", () => {
  afterAll(async () => {
    await signOut(getAuth());
  });

  test("get user with the email", async () => {
    const name = "ExampleName";
    const email = `test${Date.now()}@example.com`;
    const password = Math.floor(Math.random() * 1000000).toString();
    const role = "student";

    await registerUser(name, email, password, role);

    const result = await getUserWithEmail(email);

    expect(result).toHaveProperty("name", name);
    expect(result).toHaveProperty("email", email);
    expect(result).toHaveProperty("password", password);
    expect(result).toHaveProperty("role", role);
  });
});
