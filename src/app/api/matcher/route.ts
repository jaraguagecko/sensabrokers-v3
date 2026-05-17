import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";
import { runMatcher } from "@/lib/matcher";
import type { MatcherInput } from "@/lib/matcher";

function loadProducts() {
  const yaml = readFileSync(join(process.cwd(), "config/matcher/products.yaml"), "utf-8");
  const config = parse(yaml) as { products: Record<string, unknown>[] };
  return config.products;
}

export async function POST(req: NextRequest) {
  try {
    const input: MatcherInput = await req.json();
    const products = loadProducts();
    const results = runMatcher(input, products);
    return NextResponse.json({ results });
  } catch (err) {
    console.error("Matcher error:", err);
    return NextResponse.json({ results: [], error: "Error evaluando perfil" }, { status: 500 });
  }
}
