export const methodOptions = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export const errorScenarios = [
  { code: "400", name: "Bad Request" },
  { code: "403", name: "Forbidden" },
  { code: "404", name: "Not Found" },
  { code: "409", name: "Conflict" },
  { code: "500", name: "Server Error" },
];

export const methodTemplates = {
  headers: {
    GET: {
      Accept: "application/json",
      Authorization: "Bearer <token>",
      "Cache-Control": "no-cache",
      "User-Agent": "API-Sage-Client/1.0",
    },
    POST: {
      "Content-Type": "application/json",
      Authorization: "Bearer <token>",
      Accept: "application/json",
      "X-CSRF-Token": "random-token-123",
    },
    PUT: {
      "Content-Type": "application/json",
      Authorization: "Bearer <token>",
      "If-Match": "etag-value",
      Accept: "application/json",
    },
    PATCH: {
      "Content-Type": "application/json-patch+json",
      Authorization: "Bearer <token>",
      "If-Match": "etag-value",
      Accept: "application/json",
    },
    DELETE: {
      Authorization: "Bearer <token>",
      "If-Match": "etag-value",
    },
  },

  bodies: {
    POST: {
      user: {
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        preferences: {
          theme: "dark",
          notifications: true,
        },
      },
    },
    PUT: {
      user: {
        id: "123",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        preferences: {
          theme: "light",
          notifications: false,
        },
      },
    },
    PATCH: [
      { op: "replace", path: "/name", value: "Jane Doe" },
      { op: "add", path: "/preferences/language", value: "en" },
    ],
  },

  responseHeaders: {
    GET: {
      "Content-Type": "application/json",
      "Cache-Control": "private, max-age=3600",
      ETag: 'W/"123456789"',
      "X-RateLimit-Limit": "100",
      "X-RateLimit-Remaining": "99",
    },
    POST: {
      "Content-Type": "application/json",
      Location: "/api/resources/123",
      "Set-Cookie": "session=abc123; HttpOnly; Secure",
      "X-RateLimit-Limit": "100",
      "X-RateLimit-Remaining": "98",
    },
    PUT: {
      "Content-Type": "application/json",
      ETag: 'W/"987654321"',
      "X-RateLimit-Limit": "100",
      "X-RateLimit-Remaining": "97",
    },
    PATCH: {
      "Content-Type": "application/json",
      ETag: 'W/"987654321"',
      "X-RateLimit-Limit": "100",
      "X-RateLimit-Remaining": "96",
    },
    DELETE: {
      "X-RateLimit-Limit": "100",
      "X-RateLimit-Remaining": "95",
    },
  },

  cookies: {
    session: {
      name: "session",
      value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      options: {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600,
      },
    },
  },
};

export const defaultResponseData = {
  status: 0,
  headers: {},
  body: {},
};

export const REQUEST = "Request";

export const RESPONSE = "Response";
