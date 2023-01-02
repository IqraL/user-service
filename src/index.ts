import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import {
  AuthLinkRequest,
  AuthLinkResponse,
  AuthRequest,
  AuthResponse,
  ValidJwtRequest,
  ValidJwtResponse,
} from "./routes/types";
import {
  generateAuthenticationLink,
  loginOrSignUp,
  validateToken,
} from "./routes";

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3002;

app.get("/auth-link", async (req: AuthLinkRequest, res: AuthLinkResponse) =>
  generateAuthenticationLink({ res })
);

app.post("/login", async (req: AuthRequest, res: AuthResponse) =>
  loginOrSignUp({ req, res })
);

app.get("/valid-token", (req: ValidJwtRequest, res: ValidJwtResponse) =>
  validateToken({
    req,
    res,
  })
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
