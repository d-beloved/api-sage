import { NextRequest, NextResponse } from "next/server";
import { methodTemplates } from "@/constants";

function simulateError(req: NextRequest) {
  const url = new URL(req.url);
  const errorType = url.searchParams.get("error");

  const errorHeaders = {
    "Content-Type": "application/problem+json",
    "X-Error-Code": errorType,
    "Cache-Control": "no-store",
  };

  switch (errorType) {
    case "400":
      return NextResponse.json({
        status: 400,
        headers: {
          ...errorHeaders,
          "X-Error-Details": "Request validation failed",
        },
        body: { error: "Bad Request", message: "Invalid request parameters" },
      });
    case "403":
      return NextResponse.json({
        status: 403,
        headers: {
          ...errorHeaders,
          "WWW-Authenticate": "Bearer error='insufficient_scope'",
        },
        body: {
          error: "Forbidden",
          message: "You don't have permission to access this resource",
        },
      });
    case "404":
      return NextResponse.json({
        status: 404,
        headers: errorHeaders,
        body: { error: "Not Found", message: "Resource not found" },
      });
    case "409":
      return NextResponse.json({
        status: 409,
        headers: {
          ...errorHeaders,
          "X-Conflict-Id": "existing_resource_123",
        },
        body: { error: "Conflict", message: "Resource already exists" },
      });
    case "500":
      return NextResponse.json({
        status: 500,
        headers: {
          ...errorHeaders,
          "Retry-After": "60",
        },
        body: {
          error: "Internal Server Error",
          message: "Something went wrong",
        },
      });
    default:
      return null;
  }
}

export async function GET(request: NextRequest) {
  const errorResponse = simulateError(request);
  if (errorResponse) return errorResponse;

  return NextResponse.json({
    status: 200,
    headers: methodTemplates.responseHeaders.GET,
    body: {
      message: "GET request successful",
      data: { users: ["John", "Jane"] },
    },
  });
}

export async function POST(request: NextRequest) {
  const errorResponse = simulateError(request);
  if (errorResponse) return errorResponse;

  const reqBody = await request.json();
  const response = NextResponse.json({
    status: 201,
    headers: methodTemplates.responseHeaders.POST,
    body: { message: "POST request successful", data: reqBody },
  });

  const { name, value, options } = methodTemplates.cookies.session;
  const updatedOptions = {
    ...options,
    sameSite: options.sameSite as "strict" | "lax" | "none" | undefined,
  };
  response.cookies.set(name, value, updatedOptions);

  return response;
}

export async function PUT(request: NextRequest) {
  const errorResponse = simulateError(request);
  if (errorResponse) return errorResponse;

  const body = await request.json();
  return NextResponse.json({
    status: 200,
    headers: methodTemplates.responseHeaders.PUT,
    body: { message: "PUT request successful", data: body },
  });
}

export async function PATCH(request: NextRequest) {
  const errorResponse = simulateError(request);
  if (errorResponse) return errorResponse;

  const body = await request.json();
  return NextResponse.json({
    status: 200,
    headers: methodTemplates.responseHeaders.PATCH,
    body: { message: "PATCH request successful", data: body },
  });
}

export async function DELETE(request: NextRequest) {
  const errorResponse = simulateError(request);
  if (errorResponse) return errorResponse;

  return NextResponse.json({
    status: 200,
    headers: methodTemplates.responseHeaders.DELETE,
    body: { message: "DELETE request successful" },
  });
}
