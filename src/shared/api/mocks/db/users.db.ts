import type { User } from "../../model/types";

export const usersDB: User[] = [
  // --- FRANKFURT ---
  {
    id: "c9a646d3-9c61-4cd9-bc11-658fa2f33333",
    username: "frankfurt-appraiser",
    role: "APPRAISER",
    branchId: "3u1e8f9g-2k4l-0a9s-5j-6i-34qw56er78ty",
  },
  {
    id: "d2b557e4-8c61-4cd9-bc11-758fa2f44444",
    username: "frankfurt-cashier",
    role: "CASHIER",
    branchId: "3u1e8f9g-2k4l-0a9s-5j-6i-34qw56er78ty",
  },
  {
    id: "e5f889a1-7b62-4cd9-bc11-858fa2f55555",
    username: "frankfurt-manager",
    role: "MANAGER",
    branchId: "3u1e8f9g-2k4l-0a9s-5j-6i-34qw56er78ty",
  },

  // --- HAMBURG ---
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-0123456789ab",
    username: "hamburg-appraiser",
    role: "APPRAISER",
    branchId: "550e8400-e29b-41d4-a716-446655440000",
  },
  {
    id: "b2c3d4e5-f6a7-5b8c-9d0e-1234567890bc",
    username: "hamburg-cashier",
    role: "CASHIER",
    branchId: "550e8400-e29b-41d4-a716-446655440000",
  },
  {
    id: "c3d4e5f6-a7b8-6c9d-0e1f-2345678901cd",
    username: "hamburg-manager",
    role: "MANAGER",
    branchId: "550e8400-e29b-41d4-a716-446655440000",
  },

  // --- STUTTGART ---
  {
    id: "f4e3d2c1-b0a9-4f8e-7d6c-5b4a3f2e1d0c",
    username: "stuttgart-appraiser",
    role: "APPRAISER",
    branchId: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  },
  {
    id: "e3d2c1b0-a9f8-5e7d-6c5b-4a3f2e1d0c9b",
    username: "stuttgart-cashier",
    role: "CASHIER",
    branchId: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  },
  {
    id: "d2c1b0a9-f8e7-6d5c-4b3a-2f1e0d9c8b7a",
    username: "stuttgart-manager",
    role: "MANAGER",
    branchId: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  },
];
