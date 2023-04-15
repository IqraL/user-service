import {
  CompanyDetails,
  IsUserRegisteredRequest,
  ItemTypes,
} from "@midnight-moon/shared-types";
import { searchDbItemWrapper } from "@midnight-moon/mongo-db-layer";

export const isUserRegistered =
  (req: IsUserRegisteredRequest) => async (): Promise<boolean> => {
    const { email } = req.body;
    const companyDetails = await searchDbItemWrapper<CompanyDetails>({
      searchPropertiesAndValues: [
        {
          admins: [email],
          users: [email],
        },
      ],
      regexProperties: [],
      searchType: "or",
      itemType: ItemTypes.CompanyDetails,
    });

    let isUserRegistered = false;

    if (companyDetails.length) {
      isUserRegistered = true;
    }

    if (!isUserRegistered) {
      throw new Error(
        `Please register you're company for the app, or ask you're admin to add you to the user list if you're company is already using us.`
      );
    }

    return isUserRegistered;
  };
