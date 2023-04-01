import { CompanyDetails } from "@midnight-moon/shared-types";
import express from "express";
import { responseWrapper } from "../../routes/helpers/utils";
import { addCompany, searchCompanies } from "./logic";
import { AddCompanyDetailsRequest, SearchCompanyDetailsRequest } from "./types";

const companiesRouter = express.Router();

companiesRouter.post(
  "/add-company",
  async (req: AddCompanyDetailsRequest, res) =>
    await responseWrapper<CompanyDetails>(addCompany(req), res)
);

companiesRouter.post(
  "/search-companies",
  async (req: SearchCompanyDetailsRequest, res) =>
    await responseWrapper<CompanyDetails[]>(searchCompanies(req), res)
);

export { companiesRouter };
