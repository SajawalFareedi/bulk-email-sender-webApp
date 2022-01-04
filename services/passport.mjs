import passport from "passport";
import googleOauth from "passport-google-oauth20";
import Keys from "../config/keys.js";
import User from "../models/userModel.mjs";

const PassConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
  passport.use(
    new googleOauth(
      {
        clientID: Keys.googleCID,
        clientSecret: Keys.googleCSCT,
        callbackURL: "/auth/google/callback",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const Id = profile.id;
          const Name = profile.displayName;
          const isUserExists = await User.findOne({ googleID: Id });
          if (isUserExists) {
            return done(null, isUserExists);
          }
          const user = await new User({ Name: Name, googleID: Id }).save();
          done(null, user);
        } catch (error) {
          console.log(error);
        }
      }
    )
  );+9
};

export default PassConfig;
