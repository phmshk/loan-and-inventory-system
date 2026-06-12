import { CONFIG } from "@/shared/model/config";
import { http, HttpResponse } from "msw";
import type {
  GetLoansResponse,
  UpdateLoanStatusRequest,
  CreateLoanRequest,
  CreateLoanResponse,
  UpdateLoanRequest,
} from "../../model/types";
import { loansDBMethods } from "../db/loans.db";
import { branchesDB } from "../db/branches.db";
import { loanFiltersSchema } from "../../model/filters.types";

export const loanHandlers = [
  // GET /loans
  http.get(`${CONFIG.API_BASE_URL}/loans`, ({ request }) => {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const result = loanFiltersSchema.safeParse(queryParams);

    if (!result.success) {
      return HttpResponse.json(
        {
          code: "VALIDATION_ERROR",
          message: "Invalid query params",
        },
        { status: 400 },
      );
    }

    const { page, size, sortOrder, category, sortBy, status } = result.data;

    let filteredLoans = loansDBMethods.getAll();

    // apply filters
    if (status) {
      filteredLoans = filteredLoans.filter((loan) => loan.status === status);
    }

    if (category) {
      filteredLoans = filteredLoans.filter(
        (loan) => loan.category === category,
      );
    }

    // sort loans
    if (sortBy) {
      filteredLoans.sort((a, b) => {
        const valueA = a[sortBy as keyof typeof a];
        const valueB = b[sortBy as keyof typeof b];

        if (typeof valueA === "number" && typeof valueB === "number") {
          return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        }

        return sortOrder === "asc"
          ? String(valueA).localeCompare(String(valueB))
          : String(valueB).localeCompare(String(valueA));
      });
    }

    // pagination
    const totalItems = filteredLoans.length;
    const totalPages = Math.ceil(totalItems / size);
    const startIndex = (page - 1) * size;
    const paginatedItems = filteredLoans.slice(startIndex, startIndex + size);

    const responsePayload: GetLoansResponse = {
      items: paginatedItems,
      totalItems,
      totalPages,
    };

    return HttpResponse.json(responsePayload, { status: 200 });
  }),

  // GET /loans/{id}
  http.get(`${CONFIG.API_BASE_URL}/loans/:id`, ({ params }) => {
    const { id } = params;

    if (!id || typeof id !== "string") {
      return HttpResponse.json(
        { code: "VALIDATION_ERROR", message: "Invalid ID" },
        { status: 400 },
      );
    }
    const loan = loansDBMethods.getById(id);

    if (!loan) {
      return HttpResponse.json(
        {
          code: "RESOURCE_NOT_FOUND",
          message: "Loan with specified ID does not exist.",
        },
        { status: 404 },
      );
    }

    return HttpResponse.json(loan, { status: 200 });
  }),

  // POST /loans
  http.post(`${CONFIG.API_BASE_URL}/loans`, async ({ request }) => {
    const body = (await request.json()) as CreateLoanRequest;

    if (!body.loanAmountCents || body.loanAmountCents <= 0) {
      return HttpResponse.json(
        { code: "VALIDATION_ERROR", message: "loan amount must be >= 0" },
        { status: 400 },
      );
    }

    const id = crypto.randomUUID();
    const branch = branchesDB.find((b) => b.id === body.branchId);
    if (!branch) {
      return HttpResponse.json(
        {
          code: "VALIDATION_ERROR",
          message: "Provided branchId does not exist.",
        },
        { status: 400 },
      );
    }
    const branchPrefix = branch.code;
    const currentYear = new Date().getFullYear();
    const sequence = Math.floor(1000 + Math.random() * 9000);
    const ticketNumber = `${branchPrefix}-${currentYear}-${sequence}`;

    const newLoan: CreateLoanResponse = {
      id,
      ticketNumber,
      status: "ACTIVE",
      customerId: body.customerId,
      loanAmountCents: body.loanAmountCents,
      itemDescription: body.itemDescription,
      category: body.category,
      startDate: body.startDate,
      endDate: body.endDate,
      interestRatePercent: body.interestRatePercent,
      feesCents: body.feesCents,
      branchId: body.branchId,
    };

    loansDBMethods.create(newLoan);
    return HttpResponse.json(newLoan, { status: 201 });
  }),

  // PATCH /loans/:id
  http.patch(
    `${CONFIG.API_BASE_URL}/loans/:id`,
    async ({ request, params }) => {
      const { id } = params;
      const body = (await request.json()) as UpdateLoanRequest;

      if (!id || typeof id !== "string") {
        return HttpResponse.json(
          { code: "VALIDATION_ERROR", message: "Invalid ID" },
          { status: 400 },
        );
      }

      const updatedLoan = loansDBMethods.updateById(id, body);

      if (!updatedLoan) {
        return HttpResponse.json(
          {
            code: "RESOURCE_NOT_FOUND",
            message: "Loan with specified ID does not exist.",
          },
          { status: 404 },
        );
      }

      return HttpResponse.json(updatedLoan, { status: 200 });
    },
  ),

  // PATCH /loans/{id}/status
  http.patch(
    `${CONFIG.API_BASE_URL}/loans/:id/status`,
    async ({ request, params }) => {
      const { id } = params;

      if (!id || typeof id !== "string") {
        return HttpResponse.json(
          { code: "VALIDATION_ERROR", message: "Invalid ID" },
          { status: 400 },
        );
      }

      const body = (await request.json()) as UpdateLoanStatusRequest;

      if (!body.status) {
        return HttpResponse.json(
          {
            code: "VALIDATION_ERROR",
            message: "Status is required",
          },
          { status: 400 },
        );
      }

      const updatedLoan = loansDBMethods.updateStatusById(id, body.status);

      if (!updatedLoan) {
        return HttpResponse.json(
          {
            code: "RESOURCE_NOT_FOUND",
            message: "Loan with specified ID does not exist.",
          },
          { status: 404 },
        );
      }

      return HttpResponse.json(updatedLoan, { status: 200 });
    },
  ),

  // DELETE /loans/:id
  http.delete(`${CONFIG.API_BASE_URL}/loans/:id`, ({ params }) => {
    const { id } = params;

    if (typeof id !== "string") {
      return HttpResponse.json(
        { code: "VALIDATION_ERROR", message: "Invalid ID" },
        { status: 400 },
      );
    }

    const isDeleted = loansDBMethods.deleteById(id);

    if (!isDeleted) {
      return HttpResponse.json(
        {
          code: "RESOURCE_NOT_FOUND",
          message: "Loan with specified ID does not exist.",
        },
        { status: 404 },
      );
    }

    return new HttpResponse(null, { status: 204 });
  }),
];
