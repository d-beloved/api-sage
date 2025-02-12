import { NextRequest, NextResponse } from "next/server";

function simulateError(req: NextRequest) {
  const url = new URL(req.url);
  const errorType = url.searchParams.get("error");

  switch (errorType) {
    case "400":
      return NextResponse.json(
        { error: "Bad Request", message: "Invalid request parameters" },
        { status: 400 }
      );
    case "403":
      return NextResponse.json(
        {
          error: "Forbidden",
          message: "You don't have permission to access this resource",
        },
        { status: 403 }
      );
    case "404":
      return NextResponse.json(
        { error: "Not Found", message: "Resource not found" },
        { status: 404 }
      );
    case "409":
      return NextResponse.json(
        { error: "Conflict", message: "Resource already exists" },
        { status: 409 }
      );
    case "500":
      return NextResponse.json(
        { error: "Internal Server Error", message: "Something went wrong" },
        { status: 500 }
      );
    default:
      return null;
  }
}

export async function GET(request: NextRequest) {
  const errorResponse = simulateError(request);
  if (errorResponse) return errorResponse;

  return NextResponse.json(
    { message: "GET request successful", data: { users: ["John", "Jane"] } },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const errorResponse = simulateError(request);
  if (errorResponse) return errorResponse;

  const body = await request.json();
  return NextResponse.json(
    { message: "POST request successful", data: body },
    { status: 201 }
  );
}

export async function PUT(request: NextRequest) {
  const errorResponse = simulateError(request);
  if (errorResponse) return errorResponse;

  const body = await request.json();
  return NextResponse.json(
    { message: "PUT request successful", data: body },
    { status: 200 }
  );
}

export async function PATCH(request: NextRequest) {
  const errorResponse = simulateError(request);
  if (errorResponse) return errorResponse;

  const body = await request.json();
  return NextResponse.json(
    { message: "PATCH request successful", data: body },
    { status: 200 }
  );
}

export async function DELETE(request: NextRequest) {
  const errorResponse = simulateError(request);
  if (errorResponse) return errorResponse;

  return NextResponse.json(
    { message: "DELETE request successful" },
    { status: 200 }
  );
}

export async function HEAD(request: NextRequest) {
  const errorResponse = simulateError(request);
  if (errorResponse) return errorResponse;

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-Custom-Header": "HEAD request successful",
    },
  });
}

export async function OPTIONS(request: NextRequest) {
  const errorResponse = simulateError(request);
  if (errorResponse) return errorResponse;

  return new NextResponse(null, {
    status: 200,
    headers: {
      Allow: "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
      "Access-Control-Allow-Methods":
        "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
    },
  });
}

export async function TRACE(request: NextRequest) {
  const errorResponse = simulateError(request);
  if (errorResponse) return errorResponse;

  return NextResponse.json(
    { message: "TRACE request successful", headers: request.headers },
    { status: 200 }
  );
}

export async function CONNECT(request: NextRequest) {
  const errorResponse = simulateError(request);
  if (errorResponse) return errorResponse;

  return NextResponse.json(
    { message: "CONNECT request successful" },
    { status: 200 }
  );
}
