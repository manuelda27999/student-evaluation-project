//Test to login a user
import loginUser from "../logic/loginUser";

describe("loginUser", () => {
  it("should log in a user with valid credentials", async () => {
    const user = await loginUser("ana@ana.com", "123456789");
    console.log("Email del usuario: " + user?.email);
    expect(user).toHaveProperty("email", "ana@ana.com");
  });
});
