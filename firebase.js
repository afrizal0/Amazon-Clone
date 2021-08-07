var firebaseConfig = {

    apiKey: "AIzaSyASw8Wg3oI0WPt-n0nGXLJGp6ysAYyxHe0",

    authDomain: "clone-4e5c2.firebaseapp.com",

    projectId: "clone-4e5c2",

    storageBucket: "clone-4e5c2.appspot.com",

    messagingSenderId: "505533255556",

    appId: "1:505533255556:web:931c078b944d794c75d7d1",

    measurementId: "G-D076QBV57J"

  };

  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);

  firebase.analytics();

  var db = firebase.firestore();