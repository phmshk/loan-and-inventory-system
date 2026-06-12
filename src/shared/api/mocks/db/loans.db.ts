import type { Loan, LoanStatus } from "../../model/types";
import { loansData } from "./loans.data";

export const loansDB: Loan[] = loansData;

export const loansDBMethods = {
  getAll: (): Loan[] => {
    return loansDB;
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
