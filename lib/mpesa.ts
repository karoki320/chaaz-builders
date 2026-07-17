// Safaricom Daraja API integration (direct, no third-party processor).
// Docs: https://developer.safaricom.co.ke/APIs/MpesaExpressSimulate

const BASE_URL = process.env.MPESA_BASE_URL ?? "https://sandbox.safaricom.co.ke";

function timestamp() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

async function getAccessToken() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  if (!consumerKey || !consumerSecret) {
    throw new Error("MPESA_CONSUMER_KEY / MPESA_CONSUMER_SECRET are not set");
  }
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  const res = await fetch(`${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  if (!res.ok) throw new Error(`Daraja auth failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.access_token as string;
}

type StkPushParams = {
  phoneNumber: string; // format: 2547XXXXXXXX
  amount: number;
  orderNumber: string;
};

export async function triggerMpesaStkPush({ phoneNumber, amount, orderNumber }: StkPushParams) {
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;
  if (!shortcode || !passkey || !callbackUrl) {
    throw new Error("MPESA_SHORTCODE / MPESA_PASSKEY / MPESA_CALLBACK_URL are not set");
  }

  const ts = timestamp();
  const password = Buffer.from(`${shortcode}${passkey}${ts}`).toString("base64");
  const accessToken = await getAccessToken();

  const res = await fetch(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: ts,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(amount),
      PartyA: phoneNumber,
      PartyB: shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackUrl,
      AccountReference: orderNumber,
      TransactionDesc: `Chaaz Builders order ${orderNumber}`,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Daraja STK push failed: ${res.status} ${body}`);
  }

  return res.json();
}
