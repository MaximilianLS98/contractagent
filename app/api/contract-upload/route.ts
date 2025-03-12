import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ message: "Hello World, this endpoint is not set up properly yet" });
}