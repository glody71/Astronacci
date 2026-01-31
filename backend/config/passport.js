const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const db = require("./db");

/* =======================
   GOOGLE STRATEGY
======================= */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || null;

        // cek user google
        const result = await db.query(
          "SELECT * FROM users WHERE provider = 'google' AND provider_id = $1",
          [profile.id]
        );

        if (result.rows.length > 0) {
          return done(null, result.rows[0]);
        }

        // register otomatis
        const newUser = await db.query(
          `INSERT INTO users 
           (name, email, provider, provider_id, membership_type)
           VALUES ($1,$2,'google',$3,'A')
           RETURNING id,name,email,membership_type`,
          [profile.displayName, email, profile.id]
        );

        return done(null, newUser.rows[0]);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

/* =======================
   FACEBOOK STRATEGY
======================= */
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "/api/auth/facebook/callback",
//       profileFields: ["id", "displayName", "emails"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value || null;

//         // cek user facebook
//         const result = await db.query(
//           "SELECT * FROM users WHERE provider = 'facebook' AND provider_id = $1",
//           [profile.id]
//         );

//         if (result.rows.length > 0) {
//           return done(null, result.rows[0]);
//         }

//         // register otomatis
//         const newUser = await db.query(
//           `INSERT INTO users
//            (name, email, provider, provider_id, membership_type)
//            VALUES ($1,$2,'facebook',$3,'A')
//            RETURNING id,name,email,membership_type`,
//           [profile.displayName, email, profile.id]
//         );

//         return done(null, newUser.rows[0]);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

module.exports = passport;
