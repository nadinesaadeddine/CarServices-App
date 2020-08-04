import firebase from "firebase";

class Fire {
  constructor() {
    this.init();
    // this.createUser();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAxXoRqPKMQ9rLVJX7pnEBiunElUZ0S430",
        authDomain: "carservices-7f304.firebaseapp.com",
        databaseURL: "https://carservices-7f304.firebaseio.com",
        projectId: "carservices-7f304",
        storageBucket: "carservices-7f304.appspot.com",
        messagingSenderId: "726052790850",
        appId: "1:726052790850:web:54fb5789b2dd58cda8c3db",
        measurementId: "G-TXQG6EBNSY",
      });
    }
  };
  //under testing
  createUser = async () => {
    // await firebase
    //   .auth()
    //   .createUserWithEmailAndPassword("user@hotmail.com", "testtest")
    //   .then(console.log("true"))
    //   .catch((error) => {
    //     let errorCode = error.code;
    //     let errorMessage = error.message;
    //     console.log(errorCode);
    //     console.log(errorMessage);
    //   });
    await firebase
      .auth()
      .signInWithEmailAndPassword("user@hotmail.com", "testtest");
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
      this.db.push(message);
    });
  };

  parse = (message) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);
    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref("messages");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
