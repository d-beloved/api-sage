export const methodOptions = [
  "GET",
  "HEAD",
  "OPTIONS",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "TRACE",
  "CONNECT",
];

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
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "Cache-Control": "no-cache",
      "User-Agent": "API-Sage-Client/1.0",
    },
    POST: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      Accept: "application/json",
      "X-CSRF-Token": "random-token-123",
    },
    PUT: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "If-Match": "etag-value",
      Accept: "application/json",
    },
    PATCH: {
      "Content-Type": "application/json-patch+json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "If-Match": "etag-value",
      Accept: "application/json",
    },
    DELETE: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "If-Match": "etag-value",
    },
    HEAD: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "X-Custom-Header": "HEAD request",
    },
    CONNECT: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "X-Custom-Header": "CONNECT request",
    },
    OPTIONS: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "X-Custom-Header": "OPTIONS request",
    },
    TRACE: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "X-Custom-Header": "TRACE request",
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
    DELETE: null,
    TRACE: null,
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
    HEAD: {
      "Content-Type": "application/json",
      "X-Custom-Header": "HEAD request successful",
      "X-RateLimit-Limit": "100",
      "X-RateLimit-Remaining": "94",
    },
    CONNECT: {
      "Content-Type": "application/json",
      "X-Custom-Header": "CONNECT request successful",
      "X-RateLimit-Limit": "100",
      "X-RateLimit-Remaining": "94",
    },
    OPTIONS: {
      Allow: "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS, CONNECT, TRACE",
      "Access-Control-Allow-Methods":
        "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS, CONNECT, TRACE",
      "X-RateLimit-Limit": "100",
      "X-RateLimit-Remaining": "93",
    },
    TRACE: {
      "Content-Type": "application/json",
      "X-RateLimit-Limit": "100",
      "X-RateLimit-Remaining": "92",
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
  status: 200,
  headers: {},
  body: {},
};
