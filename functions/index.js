const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const sgMail = require("@sendgrid/mail");
const k = functions.config().sendgrid.key;
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

      // Notification email to Fortheloveofdogsboarding@gmail.com
      const adminMsg = {
        to: "Fortheloveofdogsboarding@gmail.com",
        from: "no-reply@em2888.nanaimoboardingfortheloveofdogs.ca",
        subject: "New Request Received",
        text: `New request details:\n${JSON.stringify(newValue, null, 2)}`,
      };

      // Log the email messages for review
      console.log("Sending email with following details:", msg);
      console.log("Sending admin notification details:", adminMsg);

      // Sending both emails
      return Promise.all([sgMail.send(msg), sgMail.send(adminMsg)])
          .then((responses) => {
            console.log("Emails sent successfully:", responses);
            return null;
          })
          .catch((error) => {
            console.error("Error sending emails:", error);
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
        text:
        `Hello ${newValue.firstName},\n` +
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

      return sgMail
          .send(msg)
          .then((response) => {
            console.log("Sitting email sent successfully:", response);
            return null;
          })
          .catch((error) => {
            console.error("Error sending sitting email:", error);
            return null;
          });
    });

exports.sendRejectionEmail = functions.firestore
    .document("requests/{requestId}")
    .onDelete((snap, context) => {
      const oldValue = snap.data(); // the data of the deleted document

      // If the document was marked as accepted, don't send a rejection email
      if (oldValue.accepted) {
        console.log("Request was accepted, not sending rejection email.");
        return null;
      }

      // Check if there is an email field
      if (!oldValue.email) {
        console.error("Email field is missing in the deleted document!");
        return null; // Exit the function
      }

      const msg = {
        to: oldValue.email,
        from: "no-reply@em2888.nanaimoboardingfortheloveofdogs.ca",
        subject: "About Your Request...",
        text: `Hello ${oldValue.firstName},\n` +
            `We regret to inform you that your request 
            has not been accepted at this time. ` +
            `Thank you for showing interest. Feel 
            free to try again in the future.`,
      };

      // Log the email message for review
      console.log("rejection email with details:", msg);

      return sgMail.send(msg)
          .then((response) => {
            console.log("Rejection email sent successfully:", response);
            return null;
          })
          .catch((error) => {
            console.error("Error sending rejection email:", error);
            return null;
          });
    });
