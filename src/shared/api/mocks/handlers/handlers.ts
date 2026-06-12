import { authHandlers } from "./authHandlers";
import { loanHandlers } from "./loanHandlers";

export const handlers = [...loanHandlers, ...authHandlers];
