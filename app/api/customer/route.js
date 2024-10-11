import Customer from "@/models/Customer";

export async function GET() {
  return Response.json(await Customer.find());
}

export async function POST(request) {
  const body = await request.json();
  const category = new Customer(body);
  await category.save();
  return Response.json(category);
}
