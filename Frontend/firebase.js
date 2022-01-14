const firebaseConfig = {
    apiKey: "AIzaSyB1UuJDwDluL4aiRPiSO4B-9fsjoFD3fxY",
    authDomain: "rinchat-42fa1.firebaseapp.com",
    projectId: "rinchat-42fa1",
    storageBucket: "rinchat-42fa1.appspot.com",
    messagingSenderId: "252735859791",
    appId: "1:252735859791:web:89cb490083ebbf322c8e3a",
    measurementId: "G-WWDHCB3GFR"
};

firebase.initializeApp(firebaseConfig);

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            if (authResult.user) {
                handleSignedInUser(authResult.user);
            }
            return false;
        },
        uiShown: function () {
            document.getElementById('loader').style.display = 'none';
        }
    },
    signInFlow: 'popup',
    signInOptions: [
        {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            recaptchaParameters: {
                type: 'image',
                size: 'invisible',
                badge: 'bottomleft'
            },
            defaultCountry: 'RO',
        }
    ],
    tosUrl: 'https://rinchat.florinstroe.com',
    privacyPolicyUrl: 'http://rinchat.florinstroe.com'
};

ui.start('#firebaseui-auth-container', uiConfig);

var handleSignedInUser = function (user) {
    document.getElementById('authentication').style.display = 'none';
    document.getElementById('appTitle').style.display = 'none';
    document.getElementById('signed-in').style.display = 'block';
    initialize()
}

var handleSignedOutUser = function () {
    document.getElementById('signed-in').style.display = 'none';
    document.getElementById('appTitle').style.display = 'block';
    document.getElementById('authentication').style.display = 'block';
    ui.start('#firebaseui-auth-container', uiConfig);
};

firebase.auth().onAuthStateChanged(function(user) {
    document.getElementById('loader').style.display = 'none';
    user ? handleSignedInUser(user) : handleSignedOutUser();
  });

var logout = function() {
    firebase.auth().signOut();
}