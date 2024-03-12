const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const PORT = 8080;
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");
const helper = require("./helpers/helper.js");
const path = require("path");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/sessions.router.js");

const authRouter = require("./routes/auth.router.js");


// app.use(express.static(path.join(__dirname, 'public')));

// initiate db
require("./dababase.js");

// Middlewares
// app.use(express.static("./src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: "secretcoder",
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 24 * 60 * 60 * 1000},
  store: MongoStore.create({
    mongoUrl:"mongodb+srv://vargasivanezequiel:coderhouse@cluster0.sybi3ex.mongodb.net/e-commerce?retryWrites=true&w=majority", ttl: 100
})
}))

// Server init
const httpServer = app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});


// Handlebars config
app.engine("handlebars", exphbs.engine({
  helpers: helper
}));

app.set("view engine", "handlebars");
app.set("views", "src/views");

// Routes
// Se separo el router de vistas de products y de CRUD de products.
app.use("/api/products", productsRouter);

app.use("/api/cart", cartsRouter);

app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);

app.use("/auth", authRouter);