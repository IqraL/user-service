import {
  createDbItemWrapper,
  searchDbItemWrapper,
  
} from "@midnight-moon/mongo-db-layer";
import {
  CompanyDetails,
  ItemTypes,
  AddCompanyDetailsRequest,
  SearchCompanyDetailsRequest,
} from "@midnight-moon/shared-types";

export const addCompany =
  (req: AddCompanyDetailsRequest) => async (): Promise<CompanyDetails> => {
    return await createDbItemWrapper<CompanyDetails>({
      item: req.body.companyDetails,
    });
  };

export const searchCompanies =
  (req: SearchCompanyDetailsRequest) => async (): Promise<CompanyDetails[]> => {
    return await searchDbItemWrapper<CompanyDetails>({
      searchPropertiesAndValues: [{ ...req.body.searchPropertiesAndValues }],
      regexProperties: [...req.body.regexProperties],
      searchType: req.body.searchType,
      itemType: ItemTypes.CompanyDetails,
    });
  };
