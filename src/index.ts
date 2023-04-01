import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  usersRouter,
  userGroupsRouter,
  authenticationRouter,
  companiesRouter,
} from "./routes";

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//@ts-ignore
// const mongodbSanitizationCheck = (req, res, next) => {
//   console.log("req", req);

//   next();
// };
// app.use(mongodbSanitizationCheck);
app.use(authenticationRouter);
app.use(usersRouter);
app.use(userGroupsRouter);
app.use(companiesRouter);

const PORT = 3002;

// app.post(
//   "/get-all-users",
//   async (req: GetAllUserRequest, res) =>
//     await responseWrapper<GetAllUserSuccess>(getAllUsers(req), res)
// );
app.get("/ping", (req, res) => {
  res.send({ msg: "pong" });
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});

// app.use((req, res, next) => {
//   console.log("Time:", Date.now());
//   next();
// });

// app.post("/auth-link", async (req: AuthLinkRequest, res: AuthLinkResponse) =>
//   generateAuthenticationLink({ res })
// );

// app.post("/login", async (req: AuthRequest, res: AuthResponse) =>
//   loginOrSignUp({ req, res })
// );

// app.post("/valid-token", (req: ValidJwtRequest, res: ValidJwtResponse) =>
//   validateToken({
//     req,
//     res,
//   })
// );

// app.post(
//   "/get-all-users",
//   async (req: GetAllUsersRequest, res: GetAllUsersResponse) =>
//     getAllUsers({ req, res })
// );
