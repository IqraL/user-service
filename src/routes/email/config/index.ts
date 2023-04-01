import mailgun from "mailgun-js";

export const DOMAIN = "sandbox724caf65085d4a75a11e3519eb5fc0cf.mailgun.org";
export const mg = mailgun({
  apiKey: "b6f0d66983633a65beb832699008e526-1d8af1f4-84f323c3",
  domain: DOMAIN,
});
