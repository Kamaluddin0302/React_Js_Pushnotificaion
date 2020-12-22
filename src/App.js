import React, { useEffect, useState } from "react";

// Import CSS
import "./App.css";

// Import Components
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { AccountSummary } from "./components/AccountSummary";
import { TransactionHistory } from "./components/TransactionHistory";
import { AddTransaction } from "./components/AddTransaction";

// Import Provider
import { GlobalProvider } from "./context/GlobalState";

//firebase

import firebase from "./config/firebase";

function App() {
  let [token, setToken] = useState("");
  const messaging = firebase.messaging();
  messaging.requestPermission().then(() => {
    console.log(messaging.getToken());
    return messaging.getToken().then((token) => {
      console.log(token);
      firebase
        .database()
        .ref("/")
        .child("messages")
        .child("token")
        .set({ token: token, text: "Kamal uddin" })
        .then(() => {
          alert("successfull");
        })
        .catch((error) => {
          alert(error);
        });
    });
  });

  let sendPushNotification = () => {
    firebase
      .database()
      .ref("/")
      .child("messages/token")
      .update({ text: Math.random() })
      .then(() => {
        alert("successfull");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <AccountSummary />
        <TransactionHistory />
        <AddTransaction />
      </div>
      <button onClick={() => sendPushNotification()}>
        Send Push Notification
      </button>
    </GlobalProvider>
  );
}

export default App;
