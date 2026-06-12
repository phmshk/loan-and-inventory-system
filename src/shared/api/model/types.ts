import type { components, paths } from "../openapi/generated/schema";

export type Loan = components["schemas"]["loan"];
export type LoanCreate = components["schemas"]["LoanCreate"];
export type LoanUpdate = components["schemas"]["LoanUpdate"];
export type LoanStatus = components["schemas"]["LoanStatus"];
export type LoanCategory = components["schemas"]["LoanCategory"];
export type User = components["schemas"]["User"];
export type UserRole = components["schemas"]["UserRole"];
export type Branch = components["schemas"]["branch"];

export type GetLoansResponse =
  paths["/loans"]["get"]["responses"]["200"]["content"]["application/json"];
export type CreateLoanRequest =
  paths["/loans"]["post"]["requestBody"]["content"]["application/json"];
export type CreateLoanResponse =
  paths["/loans"]["post"]["responses"]["201"]["content"]["application/json"];
export type UpdateLoanRequest =
  paths["/loans/{id}"]["patch"]["requestBody"]["content"]["application/json"];
export type UpdateLoanResponse =
  paths["/loans/{id}"]["patch"]["responses"]["200"]["content"]["application/json"];
export type UpdateLoanStatusRequest =
  paths["/loans/{id}/status"]["patch"]["requestBody"]["content"]["application/json"];
