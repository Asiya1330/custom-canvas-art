import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
    return NextResponse.json({
        hello:"world",
    })
  }