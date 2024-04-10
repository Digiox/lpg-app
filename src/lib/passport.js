import passport from "passport";
import LocalStrategy from "passport-local";
import UserModel from "../db/user/schema"

passport.serializeUser(function (user, done) {
  // serialize the username into session
  done(null, user.username);
});

passport.deserializeUser(async function (req, id, done) {
  // deserialize the username back into user object
  await connectDB()
  const user = await UserModel.findOne({
    username: req.body.username
  })
  done(null, user);
});

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      // Here you lookup the user in your DB and compare the password/hashed password
      
      const user = await UserModel.findOne({
        username: username
      })
      // Security-wise, if you hashed the password earlier, you must verify it
      // if (!user || await argon2.verify(user.password, password))
      if (!user) {
        done(null, null);
      } else {
        done(null, user);
      }
    },
  ),
);

export default passport;