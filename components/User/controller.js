import userModel from "./model.js"

//controller function for GET login page
const loginForm = (request, response) => {
  //render login page
  response.render("user/login");
}

//controller function for POST login form
const login = async (request, response) => {
  //authenticate user and redirect to /admin
  let auth = await userModel.authenticateUser(request.body.u, request.body.pw);
  console.log(auth);
  if (auth) {
    //if authenticated, set session variables
    request.session.loggedIn = true;
    request.session.user = request.body.u;
    //now redirect to /admin
    response.redirect("/admin");
  } else {
    // if login fails, render login page with error message
    response.render("user/login", { err: "User not found" });
  }
}
//controller function for GET logout path
const logout = (request, response) => {
  //destroy session and redirect to home
  request.session.destroy();
  response.redirect("/");
}
//controller function for GET register page
const registerForm = (request, response) => {
  response.render("user/register");
}
//controller function for POST register form
const register = async (request, response) => {
  //get values from form and create new user
  let result = await userModel.addUser(request.body.u, request.body.pw);
  console.log(`result: ${result}`);
  if (result) {
    // if user added successfully, redirect to login page
    response.redirect("/login");
  } else { // if user not added successfully, render register page with error message
    response.render("user/register", { err: "Username already exists"});
  }
}

export default {
  loginForm,
  login,
  logout,
  registerForm,
  register
};