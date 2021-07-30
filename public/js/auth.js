const url = "http://localhost:8080/api/auth/"

const form = document.querySelector("form")
form.addEventListener("submit", e => {
  e.preventDefault()
  const formData = {}
  for (let el of form.elements) {
    if (el.name.length) {
      formData[el.name] = el.value
    }
  }

  fetch(url + "login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json"},
  })
    .then(resp => resp.json())
    .then(({token, msg}) => {
      if (msg) {
        return console.log(msg)
      }
      localStorage.setItem("token", token)
    })
    .catch(console.log)
  
})

function onSignIn(googleUser) {

  var id_token = googleUser.getAuthResponse().id_token;
  const data = {id_token}

  fetch(url + "google", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
    .then(resp => resp.json()).then(({ token }) => {
      localStorage.setItem("token", token)
    })
    .catch(console.error)
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    localStorage.removeItem("token")
  });
}
