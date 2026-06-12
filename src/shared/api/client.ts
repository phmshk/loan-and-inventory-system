import createFetchClient from "openapi-fetch";
// import createClient from "openapi-react-query";
import type { ApiPaths } from ".";

export const fetchClient = createFetchClient<ApiPaths>({ baseUrl: "/api/v1" }); // 6kb

// export const rqClient = createClient(fetchClient); // 1kb
