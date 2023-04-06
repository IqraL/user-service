import {
  CompanyDetails,
  IsUserRegisteredRequest,
  ItemTypes
} from "@midnight-moon/shared-types";
import { searchDbItemWrapper } from "@midnight-moon/mongo-db-layer";

export const isUserRegistered = (req: IsUserRegisteredRequest ) => async (): Promise<boolean> => {
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

  if (companyDetails.length) {
    return true;
  } else {
    return false;
  }
};
