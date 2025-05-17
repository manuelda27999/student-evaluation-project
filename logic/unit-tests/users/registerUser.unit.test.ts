import { faker } from "@faker-js/faker";
import registerUser from "../../users/registerUser";
import admin from "../../../firebase/firebaseAdmin";
import { auth } from "../../../firebase/credentials";
import { signOut } from "firebase/auth";

describe("registerUser (with random valid data)", () => {
  test("registers user succesufully with random data", async () => {
    const validRole = "student";
    const validCourseId = "uytEidnU3GVsyhNcpbmc";
    const randomName = faker.person.firstName();
    const randomEmail = faker.internet
      .email({ firstName: randomName })
      .toLowerCase();
    const randomPassword = faker.internet.password({ length: 10 });

    const result = await registerUser(
      randomName,
      randomEmail,
      randomPassword,
      validRole,
      validCourseId
    );

    expect(result).toHaveProperty("uid");

    let actualEmail;

    if (result.email !== null) {
      actualEmail = result.email.toLowerCase();
    }

    expect(actualEmail).toBe(randomEmail.toLowerCase());

    await admin.auth().deleteUser(result.uid);
    await admin.firestore().doc(`users/${result.uid}`).delete();
  }, 30000);

  test("throw error when email and password are not a string", async () => {
    const validRole = "student";
    const validCourseId = "uytEidnU3GVsyhNcpbmc";
    const randomName = faker.person.firstName();
    const randomEmail = faker.internet
      .email({ firstName: randomName })
      .toLowerCase();
    const randomPassword = faker.internet.password({ length: 10 });

    await expect(
      registerUser(randomName, 10, 10, validRole, validCourseId)
    ).rejects.toThrow("Email and password must be strings.");
  });

  test("throw error when name is too short", async () => {
    const validRole = "student";
    const validCourseId = "uytEidnU3GVsyhNcpbmc";
    const randomName = faker.person.firstName();
    const randomEmail = faker.internet
      .email({ firstName: randomName })
      .toLowerCase();
    const randomPassword = faker.internet.password({ length: 10 });

    await expect(
      registerUser("AB", randomEmail, randomPassword, validRole, validCourseId)
    ).rejects.toThrow("Name must be at least 3 characters long");
  });

  test("throw error when email addres is invalid", async () => {
    const validRole = "student";
    const validCourseId = "uytEidnU3GVsyhNcpbmc";
    const randomName = faker.person.firstName();
    const randomEmail = faker.internet
      .email({ firstName: randomName })
      .toLowerCase();
    const randomPassword = faker.internet.password({ length: 10 });

    await expect(
      registerUser(
        randomName,
        randomName,
        randomPassword,
        validRole,
        validCourseId
      )
    ).rejects.toThrow("Invalid email address.");
  });

  test("throw error when password is invalid", async () => {
    const validRole = "student";
    const validCourseId = "uytEidnU3GVsyhNcpbmc";
    const randomName = faker.person.firstName();
    const randomEmail = faker.internet
      .email({ firstName: randomName })
      .toLowerCase();
    const randomInvalidPassword = faker.internet.password({ length: 5 });

    await expect(
      registerUser(
        randomName,
        randomEmail,
        randomInvalidPassword,
        validRole,
        validCourseId
      )
    ).rejects.toThrow("Password must be at least 6 characters long.");
  });

  test("throw error when role is incorrect", async () => {
    const invalidRole = "other";
    const validCourseId = "uytEidnU3GVsyhNcpbmc";
    const randomName = faker.person.firstName();
    const randomEmail = faker.internet
      .email({ firstName: randomName })
      .toLowerCase();
    const randomPassword = faker.internet.password({ length: 10 });

    await expect(
      registerUser(
        randomName,
        randomEmail,
        randomPassword,
        invalidRole,
        validCourseId
      )
    ).rejects.toThrow("Role must be either 'student' or 'teacher'.");
  });

  test("throw error when course does not exists", async () => {
    const validRole = "student";
    const invalidCourseId = "invalidCourseId";
    const randomName = faker.person.firstName();
    const randomEmail = faker.internet
      .email({ firstName: randomName })
      .toLowerCase();
    const randomPassword = faker.internet.password({ length: 10 });

    await expect(
      registerUser(
        randomName,
        randomEmail,
        randomPassword,
        validRole,
        invalidCourseId
      )
    ).rejects.toThrow("The specified course does not exist.");
  });

  test("throws error when email is already in use", async () => {
    const validRole = "student";
    const invalidCourseId = "uytEidnU3GVsyhNcpbmc";
    const randomName = faker.person.firstName();
    const randomEmail = faker.internet
      .email({ firstName: randomName })
      .toLowerCase();
    const randomPassword = faker.internet.password({ length: 10 });

    // Registra el usuario la primera vez
    await registerUser(
      randomName,
      randomEmail,
      randomPassword,
      validRole,
      invalidCourseId
    );

    // Intenta registrarlo de nuevo
    await expect(
      registerUser(
        randomName,
        randomEmail,
        randomPassword,
        validRole,
        invalidCourseId
      )
    ).rejects.toThrow("The email address is already in use.");

    // Limpieza
    const { users } = await admin.auth().listUsers();
    const user = users.find((u) => u.email === randomEmail);
    if (user) {
      await admin.auth().deleteUser(user.uid);
      await admin.firestore().doc(`users/${user.uid}`).delete();
    }
  });

  afterAll(async () => {
    await signOut(auth);
  });
});
