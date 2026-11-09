require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");
const { validateSignup, validateSignin } = require("./middlewares/validation");
const { createUser, login } = require("./controllers/users");
const NotFoundError = require("./errors/not-found-err");

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/aroundb",
);

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("O servidor travará agora");
  }, 0);
});

app.post("/signup", validateSignup, createUser);
app.post("/signin", validateSignin, login);

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use("/", usersRouter);
app.use("/", cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError("A solicitação não foi encontrada"));
});

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
