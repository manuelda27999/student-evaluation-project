import createCourse from "../../logic/courses/createCourse";
import { getAuth, signOut } from "firebase/auth";

describe("createCourse", () => {
  afterAll(async () => {
    await signOut(getAuth());
  });

  test("should creaete a course", async () => {
    const name = "Bootcamp Desarrollo Web";

    const flag = await createCourse(name);

    expect(flag).toBe(true);
  }, 10000);
});
