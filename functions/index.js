const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const sgMail = require("@sendgrid/mail");
const k=functions.config().sendgrid.key;
sgMail.setApiKey(k);

sgMail.setApiKey(k);

exports.sendEmailConfirmation = functions.firestore
    .document("requests/{requestId}")
    .onCreate((snap, context) => {
      const newValue = snap.data();

      // Log the entire new value for review
      console.log("New document data:", newValue);

      if (!newValue.email) {
        console.error("Email field is missing in the new document!");
        return null; // Exit the function
      }

      const msg = {
        to: newValue.email,
        from: "no-reply@em2888.nanaimoboardingfortheloveofdogs.ca",
        subject: "Your request has been sent!",
        text: `Hello ${newValue.firstName}, 
      your request has been received and will be under review.`,
      };

      // Log the email message for review
      console.log("Sending email with following details:", msg);

      return sgMail.send(msg)
          .then((response) => {
            console.log("Email sent successfully:", response);
            return null;
          })
          .catch((error) => {
            console.error("Error sending email:", error);
            return null;
          });
    });

exports.sendSittingsConfirmation = functions.firestore
    .document("sittings/{sittingId}")
    .onCreate((snap, context) => {
      const newValue = snap.data();
      const docId = context.params.sittingId; // This gets the document ID

      // Create payment link
      const paymentLink = `http://nanaimoboardingfortheloveofdogs.ca/payment/${docId}`;

      // Log the entire new value for review
      console.log("New sitting document data:", newValue);

      if (!newValue.email) {
        console.error("Email field is missing in the new sitting document!");
        return null; // Exit the function
      }

      const msg = {
        to: newValue.email,
        from: "no-reply@em2888.nanaimoboardingfortheloveofdogs.ca",
        subject: "Your Request Has been accepted!",
        text: `Hello ${newValue.firstName},\n` +
        `your sitting request has been accepted. 
        Please follow the link below to ` +
        `pay for your sitting: ${paymentLink}\n` +
        `After your payment has been processed, 
        you will receive an email with more ` +
        `details including the business address. 
        Thank you for choosing nanaimoboardingfortheloveofdogs.ca!`,

      };

      // Log the email message for review
      console.log("Sending email for sitting with following details:", msg);

      return sgMail.send(msg)
          .then((response) => {
            console.log("Sitting email sent successfully:", response);
            return null;
          })
          .catch((error) => {
            console.error("Error sending sitting email:", error);
            return null;
          });
    });


