const express = require("express");
const cors = require("cors");
const app = express();
const AuthController = require('./controllers/authController');
const userRouter = require('./routers/userRouters');
const studentRouter = require('./routers/studentRouters');
const globalErrorHandler = require('./controllers/errorController');
const roleRouter = require('./routers/roleRouters');
var morgan = require("morgan");

// 1) MIDLEWARES
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      "https://mern-crud-demo-p6sf.vercel.app"
    ],
    methods: ["GET","POST","DELETE","PATCH"],
    allowedHeaders: ["X-Requested-With", "content-type"],
    credentials: true,
  })
);
// 2) ROUTES
app.post('/api/login', AuthController.login);
app.post('/api/signup',AuthController.signup);
app.use('/api/users', userRouter);
app.use('/api/roles',roleRouter);
app.use('/api/students', studentRouter);
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.use(globalErrorHandler);

module.exports = app;