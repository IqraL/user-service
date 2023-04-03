import mongoDbLayer from "@midnight-moon/mongo-db-layer";
import { sendValidationEmail, validateEmail } from "./index";
import * as configModule from "../config";
import {
  ItemTypes,
  SendValidationEmailRequest,
  ValidationEmailRequest,
} from "@midnight-moon/shared-types";
import uuidModule from "uuid";

jest.mock("uuid", () => ({
  ...jest.requireActual("uuid"),
}));

jest.mock("@midnight-moon/mongo-db-layer", () => ({
  ...jest.requireActual("@midnight-moon/mongo-db-layer"),
}));

jest.mock("../config", () => ({
  ...jest.requireActual("../config"),
  mg: {
    messages: jest.fn().mockReturnValue({ send: jest.fn() }),
  },
}));

describe("sendValidationEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should have correct email message", async () => {
    const mockGetOneDbItemWrapper = jest.fn().mockReturnValue(null);
    const mockCreateDbItemWrapper = jest.fn();
    const mockUpdateDbItemWrapper = jest.fn();
    const mockSendMessage = jest.fn();

    jest
      .spyOn(configModule.mg, "messages")
      .mockImplementation(jest.fn().mockReturnValue({ send: mockSendMessage }));

    jest
      .spyOn(mongoDbLayer, "getOneDbItemWrapper")
      .mockImplementation(mockGetOneDbItemWrapper);

    jest
      .spyOn(mongoDbLayer, "createDbItemWrapper")
      .mockImplementation(mockCreateDbItemWrapper);

    jest
      .spyOn(mongoDbLayer, "updateDbItemWrapper")
      .mockImplementation(mockUpdateDbItemWrapper);

    jest.spyOn(uuidModule, "v4").mockReturnValue("mockCode");

    await sendValidationEmail({
      body: { email: "test@test.com" },
    } as SendValidationEmailRequest)();

    expect(mockSendMessage).toBeCalledWith({
      from: '"App_Name" <iqralatif159@gmail.com>',
      to: "test@test.com",
      subject: "Email validation code",
      text: `Your email validation code is mockCode. Please enter this code to validate your email address.`,
    });
  });
  it("should save first email validation code to db", async () => {
    const mockGetOneDbItemWrapper = jest.fn().mockReturnValue(null);
    const mockCreateDbItemWrapper = jest.fn();
    const mockUpdateDbItemWrapper = jest.fn();
    const mockSendMessage = jest.fn();

    jest
      .spyOn(configModule.mg, "messages")
      .mockImplementation(jest.fn().mockReturnValue({ send: mockSendMessage }));

    jest
      .spyOn(mongoDbLayer, "getOneDbItemWrapper")
      .mockImplementation(mockGetOneDbItemWrapper);

    jest
      .spyOn(mongoDbLayer, "createDbItemWrapper")
      .mockImplementation(mockCreateDbItemWrapper);

    jest
      .spyOn(mongoDbLayer, "updateDbItemWrapper")
      .mockImplementation(mockUpdateDbItemWrapper);

    await sendValidationEmail({
      body: { email: "test@test.com" },
    } as SendValidationEmailRequest)();

    expect(mockGetOneDbItemWrapper).toBeCalled();
    expect(mockCreateDbItemWrapper).toBeCalled();
    expect(mockUpdateDbItemWrapper).not.toBeCalled();

    expect(mockSendMessage).toBeCalled();
  });

  it("should update  email validation ", async () => {
    const currentValidationCode = {
      emailValidationId: "mockId",
      email: "email",
      validationCode: "validationCode",
      itemType: ItemTypes.EmailValidation,
    };
    const mockGetOneDbItemWrapper = jest
      .fn()
      .mockReturnValue(currentValidationCode);
    const mockCreateDbItemWrapper = jest.fn();
    const mockUpdateDbItemWrapper = jest.fn();
    const mockSendMessage = jest.fn();

    jest
      .spyOn(configModule.mg, "messages")
      .mockImplementation(jest.fn().mockReturnValue({ send: mockSendMessage }));

    jest
      .spyOn(mongoDbLayer, "getOneDbItemWrapper")
      .mockImplementation(mockGetOneDbItemWrapper);

    jest
      .spyOn(mongoDbLayer, "createDbItemWrapper")
      .mockImplementation(mockCreateDbItemWrapper);

    jest
      .spyOn(mongoDbLayer, "updateDbItemWrapper")
      .mockImplementation(mockUpdateDbItemWrapper);

    await sendValidationEmail({
      body: { email: "test@test.com" },
    } as SendValidationEmailRequest)();

    expect(mockGetOneDbItemWrapper).toBeCalled();
    expect(mockCreateDbItemWrapper).not.toBeCalled();
    expect(mockUpdateDbItemWrapper).toBeCalled();

    expect(mockSendMessage).toBeCalled();
  });
});

describe("validateEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should pass if validation code and email exist",async() => {
    const currentValidationCode = {
      emailValidationId: "mockId",
      email: "email",
      validationCode: "validationCode",
      itemType: ItemTypes.EmailValidation,
    };
    const mockGetOneDbItemWrapper = jest
      .fn()
      .mockReturnValue(currentValidationCode);
    jest
      .spyOn(mongoDbLayer, "getOneDbItemWrapper")
      .mockImplementation(mockGetOneDbItemWrapper);

    
     const result = await validateEmail({
        body: {
          code: "mockCode",
          email: "email",
        },
      } as ValidationEmailRequest)();

      expect(result).toBe(true);
  });

  it("should throw error if code & email do not exist", async () => {
      const mockGetOneDbItemWrapper = jest
        .fn()
        .mockReturnValue(null);
      jest
        .spyOn(mongoDbLayer, "getOneDbItemWrapper")
        .mockImplementation(mockGetOneDbItemWrapper);

      const fn = validateEmail({
        body: {
          code: "mockCode",
          email: "email",
        },
      } as ValidationEmailRequest);

      await expect(fn()).rejects.toThrowError(
        "Incorrect Code, resend and try again"
      );
  });
});
