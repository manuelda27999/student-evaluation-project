import { after } from "node:test";
import getCourses from "../../courses/getCourses";
import { getAuth, signOut } from "firebase/auth";

describe("Get all the courses", () => {
  afterAll(async () => {
    await signOut(getAuth());
  });

  test("should get all the courses", async () => {
    const courses = await getCourses();

    console.log(courses);

    expect(courses).toBeDefined();
    expect(courses.length).toBeGreaterThan(0);
  }, 10000);
});
