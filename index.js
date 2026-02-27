import "dotenv/config";
import express from "express";
import path from "path"; //needed when setting up static/file paths
import sessions from "express-session";
import { connect } from "./db.js";

//import routers
import userRouter from "./components/User/routes.js";
import projectRouter from "./components/Projects/routes.js";
import skillRouter from "./components/Skills/routes.js";

//connect to database
connect();

const __dirname = import.meta.dirname;

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the second value above is the path: __dirname/views
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//set up app to use sessions
app.use(
  sessions({
    secret: process.env.SESSIONSECRET,
    name: "MyUniqueSessID",
    saveUninitialized: false,
    resave: false,
    cookie: {}
  })
);

//set up middleware function to check if user logged in for /admin path
app.use("/admin", (request, response, next) => {
  if (request.session.loggedIn) {
    app.locals.user = request.session.user;
    next();
  } else {
     response.redirect("/login");
  }
});
app.use("/logout", (request, response, next) => {
  app.locals.user = null;
  next();
}); 

//home page route
app.get("/", (request, response) => {
  response.render("index");
});

//admin dashboard route
app.get("/admin", (request, response) => {
  response.render("admin/dashboard");
});

//USE PAGE ROUTES FROM ROUTER(S)
app.use("/", userRouter);
app.use("/", projectRouter);
app.use("/", skillRouter);

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 

