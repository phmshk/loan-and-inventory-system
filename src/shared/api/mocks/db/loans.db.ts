import type { LoanSearchFilters } from "@/entities/loan";
import type { GetLoansResponse, Loan, LoanStatus } from "../../model/types";
import { loansData } from "./loans.data";

export const loansDB: Loan[] = loansData;

export const loansDBMethods = {
  getAll: (): Loan[] => {
    return loansDB;
  },

  query: (filters: LoanSearchFilters): GetLoansResponse => {
    const { page, size, sortBy, sortOrder, category, status, search } = filters;

    let dataset = [...loansDB];

    if (status) {
      dataset = dataset.filter((loan) => loan.status === status);
    }

    if (category) {
      dataset = dataset.filter((loan) => loan.category === category);
    }

    if (search) {
      const normalizedSearch = search.toLowerCase().trim();
      dataset = dataset.filter(
        (loan) =>
          loan.itemDescription.toLowerCase().includes(normalizedSearch) ||
          loan.ticketNumber.toLowerCase().includes(normalizedSearch),
      );
    }

    dataset.sort((a, b) => {
      const key = sortBy as keyof Loan;
      const valueA = a[key];
      const valueB = b[key];

      if (valueA === undefined || valueA === null) return 1;
      if (valueB === undefined || valueB === null) return -1;

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      return sortOrder === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });

    const totalItems = dataset.length;
    const totalPages = Math.ceil(totalItems / size);
    const startIndex = (page - 1) * size;
    const paginatedItems = dataset.slice(startIndex, startIndex + size);

    return {
      items: paginatedItems,
      totalItems,
      totalPages,
    };
  },

  getById: (id: string): Loan | null => {
    return loansDB.find((loan) => loan.id === id) || null;
  },

  create: (newLoan: Loan): Loan => {
    loansDB.push(newLoan);
    return newLoan;
  },

  updateById: (id: string, partialFields: Partial<Loan>): Loan | null => {
    const index = loansDB.findIndex((loan) => loan.id === id);
    if (index === -1) return null;

    loansDB[index] = {
      ...loansDB[index],
      ...partialFields,
    };
    return loansDB[index];
  },

  updateStatusById: (id: string, status: LoanStatus): Loan | null => {
    const index = loansDB.findIndex((loan) => loan.id === id);
    if (index === -1) return null;

    loansDB[index] = { ...loansDB[index], status };
    return loansDB[index];
  },

  deleteById: (id: string): boolean => {
    const index = loansDB.findIndex((loan) => loan.id === id);
    if (index === -1) return false;

    loansDB.splice(index, 1);
    return true;
  },
};
