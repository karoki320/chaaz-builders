import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";

// Safaricom Daraja STK Push callback.
// Docs: https://developer.safaricom.co.ke/APIs/MpesaExpressSimulate
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("[M-Pesa callback]", JSON.stringify(body));

  const stkCallback = body?.Body?.stkCallback;
  if (!stkCallback) {
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Ignored" });
  }

  const resultCode = stkCallback.ResultCode;
  const accountRef = stkCallback.CallbackMetadata?.Item?.find((i: { Name: string }) => i.Name === "AccountReference")?.Value
    ?? stkCallback.MerchantRequestID;

  const supabase = getServiceSupabase();

  // We stored the order number as AccountReference at STK push time.
  // Match on order_number if present in the callback, otherwise this needs
  // manual reconciliation via CheckoutRequestID (logged above).
  if (accountRef) {
    await supabase
      .from("orders")
      .update({ payment_status: resultCode === 0 ? "paid" : "failed" })
      .eq("order_number", accountRef);
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
