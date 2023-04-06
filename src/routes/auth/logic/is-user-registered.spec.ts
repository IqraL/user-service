import mongoDbLayer, {
  createDbItemWrapper,
} from "@midnight-moon/mongo-db-layer";
import {
  CompanyDetails,
  ItemTypes,
  mockCompanyDetails,
} from "@midnight-moon/shared-types";
import { isUserRegistered } from "./is-user-registered";
import { faker } from "@faker-js/faker";

jest.mock("@midnight-moon/mongo-db-layer", () => ({
  ...jest.requireActual("@midnight-moon/mongo-db-layer"),
}));

const companyDetails: CompanyDetails = {
  companyId: "mockCompanyId",
  domain: "mockDomain.com",
  branch: "mockBranch",
  company: "mockCompanyName",
  users: ["userOne@mockDomain.com"],
  admins: ["userTwo@mockDomain.com"],
  itemType: ItemTypes.CompanyDetails,
};

describe("isUserRegistered", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should be a valid query of a existing user", async () => {
    const companyDetails: CompanyDetails = mockCompanyDetails({});
    const user = companyDetails.users[0];

    await createDbItemWrapper<CompanyDetails>({
      item: { ...companyDetails },
    });

    const result = await isUserRegistered({
      body: {
        email: user,
      },
    })();

    expect(result).toBe(true);
  });
  it("should be a valid query of a admin user", async () => {
    const companyDetails: CompanyDetails = mockCompanyDetails({});
    const user = companyDetails.admins[0];

    await createDbItemWrapper<CompanyDetails>({
      item: { ...companyDetails },
    });

    const result = await isUserRegistered({
      body: {
        email: user,
      },
    })();

    expect(result).toBe(true);
  });
  it("should be a valid query of a invalid user", async () => {
    const companyDetails: CompanyDetails = mockCompanyDetails({});
    const user = faker.internet.email();

    await createDbItemWrapper<CompanyDetails>({
      item: { ...companyDetails },
    });

    const result = await isUserRegistered({
      body: {
        email: user,
      },
    })();

    expect(result).toBe(false);
  });

  it("should be a valid user", async () => {
    const email = "userOne@mockDomain.com";

    jest
      .spyOn(mongoDbLayer, "searchDbItemWrapper")
      .mockResolvedValue([companyDetails]);

    const result = await isUserRegistered({
      body: {
        email,
      },
    })();

    expect(result).toBe(true);
  });

  it("should be a valid admin user", async () => {
    const email = "userTwo@mockDomain.com";

    jest
      .spyOn(mongoDbLayer, "searchDbItemWrapper")
      .mockResolvedValue([companyDetails]);

    const result = await isUserRegistered({
      body: {
        email,
      },
    })();

    expect(result).toBe(true);
  });

  it("should be a invalid user", async () => {
    const email = "userTwo@mockDomain.com";

    jest.spyOn(mongoDbLayer, "searchDbItemWrapper").mockResolvedValue([]);

    const result = await isUserRegistered({
      body: {
        email,
      },
    })();

    expect(result).toBe(false);
  });
});
