import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { RequestHistory } from "@/lib/entities/RequestHistory";
import { getORM } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { method, url, headers, body } = await req.json();
    const startTime = Date.now();

    const response = await axios({
      method,
      url,
      headers,
      data: body,
      validateStatus: () => true,
    });

    const duration = Date.now() - startTime;

    // Store request in database
    const orm = await getORM();
    const em = orm.em.fork();

    const requestHistory = em.create(RequestHistory, {
      method,
      url,
      headers,
      body,
      response: response.data,
      responseHeaders: response.headers,
      statusCode: response.status,
      duration,
      createdAt: new Date(),
    });

    await em.persistAndFlush(requestHistory);

    return NextResponse.json({
      data: response.data,
      headers: response.headers,
      status: response.status,
      duration,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const orm = await getORM();
    const em = orm.em.fork();

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");

    const [requests, total] = await Promise.all([
      em.find(
        RequestHistory,
        {},
        {
          orderBy: { createdAt: "DESC" },
          limit,
          offset: (page - 1) * limit,
        }
      ),
      em.count(RequestHistory),
    ]);

    return NextResponse.json({
      requests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching request history:", error);
    return NextResponse.json(
      { error: "Failed to fetch request history" },
      { status: 500 }
    );
  }
}
