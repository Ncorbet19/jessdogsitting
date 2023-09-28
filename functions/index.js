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
        text: `Hello ${newValue.firstName},\n` +
        `your request has been received and will be under review.`,
      };

      // Notification email to Fortheloveofdogsboarding@gmail.com
      const adminMsg = {
        to: "Fortheloveofdogsboarding@gmail.com",
        from: "no-reply@em2888.nanaimoboardingfortheloveofdogs.ca",
        subject: "New Request Received",
        text: `
        New Request Details:
        --------------------
        First Name: ${newValue.firstName || "Not provided"}
        Last Name: ${newValue.lastName || "Not provided"}
        Email: ${newValue.email || "Not provided"}
        Number of Pets: ${newValue.numPets || "Not provided"}
        Start: 
        ${new Date(newValue.start.seconds * 1000).toLocaleString()}
        End: 
        ${new Date(newValue.end.seconds * 1000).toLocaleString()}
        Details: ${newValue.details || "Not provided"}
        Dog Age: ${newValue.dogAge || "Not specified"}
        Fully Vaccinated: ${newValue.isVaccinated ? "Yes" : "No"}
        Dog Name: ${newValue.dogName || "Not specified"}
        Spayed/Neutered: ${newValue.isSpayedOrNeutered ? "Yes" : "No"}
        Price: ${newValue.price || "Not specified"}
        `,
      };
      // Log the email messages for review
      console.log("Sending email with following details:", msg);
      console.log("Sending admin notification details:", adminMsg);

      // Sending both emails
      return Promise.all([sgMail.send(msg), sgMail.send(adminMsg)])
          .then((responses) => {
            console.log("Email successfully:", responses);
            return null;
          })
          .catch((error) => {
            console.error("Error email:", error);
            return null;
          });
    });

exports.sendSittingsConfirmation = functions.firestore
    .document("sittings/{sittingId}")
    .onCreate((snap, context) => {
      const newValue = snap.data();
      // const docId = context.params.sittingId; // This gets the document ID

      // Log the entire new value for review
      console.log("New sitting data:", newValue);

      if (!newValue.email) {
        console.error("Email field missing in sitting document!");
        return null; // Exit the function
      }

      const msg = {
        to: newValue.email,
        from: "no-reply@em2888.nanaimoboardingfortheloveofdogs.ca",
        subject: "Your Request Has been accepted!",
        text:
        `Hello ${newValue.firstName},\n` +
        `Great news! Your sitting request has been accepted.\n` +
        `To pay For your sitting e-transfer $${newValue.price} to ` +
        `fortheloveofdogs@gmail.com \n` +
        `Please use the same name used to book the sitting ` +
        `in the e-transfer.\n` +
        `After your payment has been processed, you will receive ` +
        `an email with more details including the business address.\n` +
        `Thank you for choosing nanaimoboardingfortheloveofdogs.ca!`,
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
        text:
        `Hello ${oldValue.firstName},\n` +
        `We regret to inform you that your request ` +
        `has not been accepted at this time. ` +
        `Thank you for showing interest. Feel ` +
        `free to try again in the future.`,
      };

      // Log the email message for review
      console.log("rejection email with details:", msg);

      return sgMail
          .send(msg)
          .then((response) => {
            console.log("Rejection email sent successfully:", response);
            return null;
          })
          .catch((error) => {
            console.error("Error sending rejection email:", error);
            return null;
          });
    });

exports.sendPaymentConfirmationEmail = functions.firestore
    .document("sittings/{sittingId}")
    .onUpdate((change, context) => {
      const newValue = change.after.data();
      // const previousValue = change.before.data();
      // const docId = context.params.sittingId; // This gets the document ID

      if (
        newValue.paymentConfirmed === true
        // && previousValue.paymentConfirmed === false
      ) {
      // Log the entire new value for review
        console.log("Updated sitting document data:", newValue);

        if (!newValue.email) {
          console.error(
              "Email field is missing in the updated sitting document!",
          );
          return null; // Exit the function
        }

        const msg = {
          to: newValue.email,
          from: "no-reply@em2888.nanaimoboardingfortheloveofdogs.ca",
          subject: "Payment Confirmation",
          text:
          `Hello ${newValue.firstName},\n` +
          `Your payment has been confirmed!\n` +
          `Your sitting details are as follows:\n` +

          `Start: 
          ${new Date(newValue.start.seconds * 1000).toLocaleString()}\n` +
          `End: 
          ${new Date(newValue.end.seconds * 1000).toLocaleString()}\n` +

          `Business Address: 123 Nanaimo\n` +

          `Thank you for choosing nanaimoboardingfortheloveofdogs.ca!`,
        };

        // Log the email message for review
        console.log(
            "Sending payment confirmation email with following details:",
            msg,
        );

        return sgMail
            .send(msg)
            .then((response) => {
              console.log(
                  "Payment confirmation email sent successfully:",
                  response,
              );
              return null;
            })
            .catch((error) => {
              console.error("Error sending payment confirmation email:", error);
              return null;
            });
      }

      // If paymentConfirmed is not true or
      // no changes in paymentConfirmed, exit the function
      return null;
    });
