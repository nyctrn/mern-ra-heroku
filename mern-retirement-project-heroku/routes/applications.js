const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../models/User");

//////////// MailHog /////////////
// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
//   host: mailhogAddress,
//   port: 1025,
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

////////////////////////////////

// GET
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user.title) {
      let results = await User.find({ application: { $exists: true } }).select(
        "-password"
      );
      res.send(results);
    } else {
      res.send("access denied");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

// POST
router.post("/", auth, async (req, res) => {
  try {
    let checkUser = await User.findById(req.user.id).select("-password");
    if (!checkUser.title) res.send("access denied");
    let user = await User.findByIdAndUpdate(
      req.body._id,
      {
        "application.status": req.body.status,
      },
      { new: true }
    );

    // const emailMsg = {
    //   from: "syntaxiodotisi@mail.com",
    //   to: user.email,
    //   subject: "Σχετικά με την αίτηση συνταξιοδότησης που καταθέσατε",
    //   text: `Αγαπητέ/ή πολίτη, η αίτηση συνταξιοδότησης που καταθέσατε, με κωδικό ${
    //     user.application.applicationId
    //   }, ${
    //     user.application.status == "δεκτή"
    //       ? `έγινε δεκτή.
    //       Μπορείτε να την βρείτε στον 'φάκελο χρήστη' και να την κατεβάσετε σε μορφή pdf.`
    //       : "δεν έγινε δεκτή."
    //   }

    //   Για περισσότερες πληροφορίες μπορείτε να επικοινωνήσετε μαζί μας μέσω τηλεφώνου ή μέσω email

    //                       Τηλέφωνα εξυπηρέτησης πολιτών: 209 987546213, 208 987546248
    //                         Ηλεκτρονικό ταχυδρομείο: aitisi@syntaxiouxosthagino.gr`,
    // };

    // await transporter.sendMail(emailMsg);

    res.json({
      msg: "success",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
