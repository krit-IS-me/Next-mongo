import Product from "@/models/Product";

export async function GET() {
  return Response.json(await Product.find());
}
