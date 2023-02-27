import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import {
  AuthLinkRequest,
  AuthLinkResponse,
  AuthRequest,
  AuthResponse,
  GetAllUsersRequest,
  GetAllUsersResponse,
  ValidJwtRequest,
  ValidJwtResponse,
} from "./routes/types";
import {
  generateAuthenticationLink,
  getAllUsers,
  loginOrSignUp,
  validateToken,
} from "./routes";

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3002;

app.post("/auth-link", async (req: AuthLinkRequest, res: AuthLinkResponse) =>
  generateAuthenticationLink({ res })
);

app.post("/login", async (req: AuthRequest, res: AuthResponse) =>
  loginOrSignUp({ req, res })
);

app.post("/valid-token", (req: ValidJwtRequest, res: ValidJwtResponse) =>
  validateToken({
    req,
    res,
  })
);

app.post(
  "/get-all-users",
  async (req: GetAllUsersRequest, res: GetAllUsersResponse) =>
    getAllUsers({ req, res })
);

app.get("/ping", (req, res) => {
  res.send({ msg: "pong" });
});

app.post("/post_test", (req, res) => {
  res.send({ msg: "pong" });
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
