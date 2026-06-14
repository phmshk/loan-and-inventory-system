import { authHandlers } from "./authHandlers";
import { branchesHandlers } from "./branchesHandlers";
import { loanHandlers } from "./loanHandlers";

export const handlers = [...loanHandlers, ...authHandlers, ...branchesHandlers];
