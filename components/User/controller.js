import userModel from "./model.js"

const loginForm = (request, response) => {
  response.render("user/login");
}

const login = async (request, response) => {
  let auth = await userModel.authenticateUser(request.body.u, request.body.pw);
  console.log(auth);
  if (auth) {
    request.session.loggedIn = true;
    request.session.user = request.body.u;
    response.redirect("/admin");
  } else {
    response.render("user/login", { err: "User not found" });
  }
}

const logout = (request, response) => {
  request.session.destroy();
  response.redirect("/");
}

const registerForm = (request, response) => {
  response.render("user/register");
}

const register = async (request, response) => {
  let result = await userModel.addUser(request.body.u, request.body.pw);
  console.log(`result: ${result}`);
  if (result) {
    response.redirect("/login");
  } else {
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