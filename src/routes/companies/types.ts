import {
  CompanyDetails,
  DatabaseOperationsParams,
  ExpressPostRequest,
  RegexProperties,
} from "@midnight-moon/shared-types";

export type SearchCompanyDetails = {
  searchPropertiesAndValues: DatabaseOperationsParams.SearchProperties<CompanyDetails>;
  regexProperties: RegexProperties<CompanyDetails>;
  searchType: "and" | "or";
};
export type SearchCompanyDetailsRequest =
  ExpressPostRequest<SearchCompanyDetails>;

export type AddCompanyDetails = {
  companyDetails: CompanyDetails;
};
export type AddCompanyDetailsRequest = ExpressPostRequest<AddCompanyDetails>;
