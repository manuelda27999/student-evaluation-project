import registerUser from "../../logic/users/registerUser";
import { getAuth, signOut } from "firebase/auth";

describe("registerUser", () => {
  afterAll(async () => {
    await signOut(getAuth());
  });

  test("should registering a new user", async () => {
    const name = "Manuel David";
    const email = `manuel@david.com`;
    const password = "123123123";
    const role = "student";

    const user = await registerUser(name, email, password, role);

    expect(user).toBeDefined();
    expect(user?.email).toBe(email);
  });
});
