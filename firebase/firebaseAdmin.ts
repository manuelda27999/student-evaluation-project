import admin from "firebase-admin";
import path from "path";

if (!admin.apps.length) {
  const serviceAccountPath = path.resolve(__dirname, "serviceAccount.json");
  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
