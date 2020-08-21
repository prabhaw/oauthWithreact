const express = require("express");
const next = require("next");

const cors = require("cors");
require("dotenv").config();
require("./server/model");

require("./db");

const facebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const passport = require("passport");

const User = mongoose.model("users");
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cors());

    // ---load data -----------------------

    server.use(
      express.urlencoded({
        extended: true,
      })
    );
    server.use(express.json());

    // ----------------------------
    passport.use(
      "facebook",
      new facebookStrategy(
        {
          clientID: process.env.FACEBOOK_CLIENTID,
          clientSecret: process.env.FACEBOOK_SECRET,
          callbackURL: "/auth/facebook/callback",
          profileFields: [
            "id",
            "displayName",
            "name",
            "gender",
            // "username",
            "email",
            // "picture.type(middle)",
            // "primary_phone",
            // "username",
          ],
        },
        function (token, refreshToken, profile, done) {
          // console.log("========Facebook Profile===================");
          // console.log(profile);
          // console.log("============================================");
          const { id, name, photo } = profile;
          User.findOne({ googleId: id }, (err, usermatch) => {
            if (err) {
              console.log("error");
              return done(null, false);
            }
            if (usermatch) {
              return done(null, usermatch);
            } else {
              const newUser = new User({
                googleId: id,
              });
              newUser
                .save()
                .then((data) => {
                  return done(null, data);
                })
                .catch((err) => {
                  return done(null, false);
                });
            }
          });
        }
      )
    );

    server.use(passport.initialize());

    server.get("/auth/facebook", passport.authorize("facebook"));

    server.get(
      "/auth/facebook/callback",
      passport.authenticate("facebook", {
        failureRedirect: "/user",
      }),
      (req, res) => {
        console.log(
          "this is user ===============================================>",
          req.user
        );
        res.redirect("http://localhost:3000?token=" + req.user.id);
      }
    );

    passport.serializeUser((user, done) => {
      // console.log("=======================Serialize......call==============");
      // console.log(user);
      // console.log("=========================================================");
      done(null, { _id: user._id });
    });

    passport.deserializeUser((id, done) => {
      // User.findOne({ _id: id }, "googleId", (err, user) => {
      //   console.log(
      //     "=============================DESERILAIZE USER CALLES++===================="
      //   );
      //   done(null, user);
      // });
      done(null, id);
    });

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((er) => {
    console.error(er.stack);
    process.exit(1);
  });
