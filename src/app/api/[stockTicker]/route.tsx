// api router

import { NextRequest, NextResponse } from "next/server";
import { getStockData } from "@/lib/stockData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const stockTicker = searchParams.get("stockTicker");
  const timeLength = searchParams.get("timeLength");
  const timespan = searchParams.get("timespan");

  if (!stockTicker || !timeLength || !timespan) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const data = await getStockData(stockTicker, timeLength, timespan);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: String(error) }, { status: 400 });
    }
  }
}
