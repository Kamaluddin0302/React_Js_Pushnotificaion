const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Sends a notifications to all users when a new message is posted.
exports.sendNotifications = functions.database
  .ref("/messages/token/")
  .onUpdate(async (snapshot) => {
    const payload = {
      notification: {
        title: `New message`,
        body: "test notification",
        icon:
          "https://tse4.mm.bing.net/th?id=OIP.q3FTUCyvaxhlOOYGAfCQTgHaFj&pid=Api&P=0&w=212&h=160",
        click_action: "https://pushnotification-a1f4b.web.app/",
      },
    };

    // Get the list of device tokens.
    const tokens = [];
    await admin
      .database()
      .ref("/messages/")
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          tokens.push(childSnapshot.val().token);
        });
      });

    if (tokens.length > 0) {
      // Send notifications to all tokens.
      console.log(tokens);
      const response = await admin.messaging().sendToDevice(tokens, payload);
      console.log(response);
      await cleanupTokens(response, tokens);
    }
  });
