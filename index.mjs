import express from "express";
import cookieSession from "cookie-session";
import passport from "passport";
import routes from "./routes/authRoutes.mjs";
import passportConfig from "./services/passport.mjs";
import "./models/userModel.mjs";
import Keys from "./config/keys.js";

const app = express();
const PORT = process.env.PORT || 8000;
passportConfig();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [Keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(PORT, () => {
  console.log(`App Listening at http://localhost:8000/`);
});
