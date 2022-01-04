import express from "express";
import passport from "passport";
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send(
    "<a href='/auth/google' style='border: 2px solid black; background-color:black; padding: 10px 12px; color: white; text-decoration: none; margin: 500px 500px !important;'>Login via Google</a>"
  );
});

routes.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

routes.get("/auth/google/callback", passport.authenticate("google"));

routes.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

routes.get("/api/logout", (req, res) => {
  req.logout();
  res.send("Your are Signed Out Successfully");
});

export default routes;
