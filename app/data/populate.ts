import registerUser from "../logic/registerUser.1.ts";

//TODO Connect to firebase
//TODO play with firebase, create, read, update and delete users, etc

console.log("Firebase initialized");

const users = [
  { email: "carlos@carlos.com", password: "123123123" },
  { email: "ana@ana.com", password: "123456789" },
  { email: "luis@luis.com", password: "password123" },
  { email: "maria@maria.com", password: "securePass1" },
  { email: "pablo@pablo.com", password: "mypassword" },
  { email: "laura@laura.com", password: "test1234" },
  { email: "david@david.com", password: "firebase123" },
  { email: "sofia@sofia.com", password: "abcdef123" },
  { email: "pedro@pedro.com", password: "pass5678" },
  { email: "elena@elena.com", password: "helloWorld99" },
];

//Register a new user
users.forEach((user) => registerUser(user.email, user.password));
