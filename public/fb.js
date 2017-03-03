
  // This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  debugger;
  console.log('statusChangeCallback');
  console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
  if (response.status === 'connected') {
          // Logged into your app and Facebook.
          //  alert(response.status);
    const token = response.authResponse.accessToken;
    window.location = `/Buyer/Facebook?token=${token}`;
  } else if (response.status === 'not_authorized') {
    LogintFb();
  } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.


  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus((response) => {
    statusChangeCallback(response);
  });
}
function loginWithFacebook() {

}

window.fbAsyncInit = function () {
  FB.init({
    appId: '1865439840358855',
    cookie: true,
    xfbml: true,
    version: 'v2.8',
  });
};

// Load the SDK asynchronously
(function (d, s, id) {
  let js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', (response) => {
    console.log(`Successful login for: ${response.name}`);
    document.getElementById('status').innerHTML =
          `Thanks for logging in, ${response.name}!`;
  });
}
function fbLogoutUser() {
  FB.getLoginStatus((response) => {
    if (response && response.status === 'connected') {
      FB.logout((response) => {
        document.location.reload();
      });
    }
  });
}
function LogintFb() {
  FB.login((response) => {
    debugger;
    if (response.authResponse) {
      const token = response.authResponse.accessToken;
      FB.api('/me?fields=email', (response) => {
        debugger;
        console.log(`Good to see you, ${response.name}.`);
        window.location = `/Buyer/Facebook?token=${token}`;
      });
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, { scope: 'email' });
}
