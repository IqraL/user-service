import { v4 as uuidv4 } from "uuid";
import { mg } from "../config";
import {
  createDbItemWrapper,
  getOneDbItemWrapper,
  updateDbItemWrapper,
} from "@midnight-moon/mongo-db-layer";
import {
  EmailValidation,
  ItemTypes,
  SendValidationEmailRequest,
  ValidationEmailRequest,
} from "@midnight-moon/shared-types";

export const sendValidationEmail =
  (req: SendValidationEmailRequest) => async () => {
    try {
      const { email } = req.body;
      const code = uuidv4();

      const alreadySentCode = await getOneDbItemWrapper<EmailValidation>({
        searchProperties: {
          email,
        },
        itemType: ItemTypes.EmailValidation,
      });

      if (!alreadySentCode) {
        await createDbItemWrapper<EmailValidation>({
          item: {
            emailValidationId: uuidv4(),
            email: email,
            validationCode: code,
            itemType: ItemTypes.EmailValidation,
          },
        });
      }else{
        await updateDbItemWrapper<EmailValidation>({
          item: { ...alreadySentCode, validationCode: code },
          itemId: {
            emailValidationId: alreadySentCode.emailValidationId
          },
        });
      }

      const data = {
        from: '"App_Name" <iqralatif159@gmail.com>',
        to: email,
        subject: "Email validation code",
        text: `Your email validation code is ${code}. Please enter this code to validate your email address.`,
      };

      await mg.messages().send(data);
    } catch (error) {
      throw new Error("Failed to send email validation code.");
    }
  };

  export const validateEmail = (req: ValidationEmailRequest) => async () => {
    try {
      const { code , email} = req.body;

      const exists = await getOneDbItemWrapper<EmailValidation>({
        searchProperties: {
          email,
          validationCode: code,
        },
        itemType: ItemTypes.EmailValidation,
      });

      if (!exists){
        throw new Error('Incorrect Code, resend and try again');
      }

     return true;
    } catch (error) {
        throw new Error("Incorrect Code, resend and try again");
    }
  };