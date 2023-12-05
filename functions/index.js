const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const sgMail = require("@sendgrid/mail");
const k = bbb
sgMail.setApiKey(k);
console.log(k);


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
        from: "no-reply@em2440.nanaimoboardingfortheloveofdogs.ca",
        subject: "Your request has been sent!",
        text: `Hello ${newValue.firstName},\n\n` +
        `your request has been received and will be under review.` +
        `If you have any questions, please contact us at \n` +
        `Fortheloveofdogsboarding@gmail.com or call 778-674-7054`,
      };

      // Notification email to Fortheloveofdogsboarding@gmail.com
      const adminMsg = {
        to: "Fortheloveofdogsboarding@gmail.com",
        from: "no-reply@em2440.nanaimoboardingfortheloveofdogs.ca",
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
        from: "no-reply@em2440.nanaimoboardingfortheloveofdogs.ca",
        subject: "Your Request Has Been Accepted!",
        text:
        `Hello ${newValue.firstName},\n\n` +
        `Great news! Your sitting request has been accepted.\n` +
        `To pay for your sitting, e-transfer $${newValue.price} to ` +
        `fortheloveofdogs@gmail.com.\n` +
        `Please use the same name used to book the sitting ` +
        `in the e-transfer.\n\n` +

        `If you would prefer to pay in cash upon pet drop-off, ` +
        `please reach out to our email and we can set that up for you: ` +
        `Fortheloveofdogsboarding@gmail.com or call 778-674-7054.\n\n` +

        `After your payment has been processed or discussed with us ` +
        `about a cash payment, you will receive an email with more ` +
        `details including the business address.\n` +
        `Thank you for choosing nanaimoboardingfortheloveofdogs.ca!\n ` +
        `If you have any questions, please contact us at ` +
        `Fortheloveofdogsboarding@gmail.com or call 778-674-7054`,
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
        from: "no-reply@em2440.nanaimoboardingfortheloveofdogs.ca",
        subject: "About Your Request...",
        text:
        `Hello ${oldValue.firstName},\n\n` +
        `We regret to inform you that your request ` +
        `has not been accepted at this time. ` +
        `Thank you for showing interest. Feel ` +
        `free to try again in the future.\n\n` +
        `If you have any questions, please contact us at ` +
        `Fortheloveofdogsboarding@gmail.com or call 778-674-7054`,
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
          from: "no-reply@em2440.nanaimoboardingfortheloveofdogs.ca",
          subject: "Pet Sitting Confirmation",
          text:
          `Hello ${newValue.firstName},\n\n` +
          `Your sitting request has been confirmed and we are ` +
          `looking forward to taking care of your pet.\n\n` +
          `Your sitting details are as follows:\n\n` +

      `Start: ${new Date(newValue.start.seconds * 1000).toLocaleString()}\n\n` +
        `End: ${new Date(newValue.end.seconds * 1000).toLocaleString()}\n\n` +

          `Payment Information:\n` +
          `If you have paid through e-transfer, your payment has been ` +
          `received successfully. No further action is required.\n` +
          `If you have arranged to pay in cash, please ensure to bring ` +
          `$${newValue.price} upon pet drop-off.\n\n` +

          `Business Address: 1823 Richardson Rd, Nanaimo, BC\n\n` +

          `Thank you for choosing nanaimoboardingfortheloveofdogs.ca!\n`+
          `If you have any questions, please contact us at ` +
          `Fortheloveofdogsboarding@gmail.com or call 778-674-7054`,
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
