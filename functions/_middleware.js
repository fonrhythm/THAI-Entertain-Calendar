const BLOCKED_IPS = [
  "165.154.1.81",
  "101.36.123.60"
];

const BLOCKED_ASN = [135377]; // UCLOUD HK,之前查到这两个IP都属于这家

export async function onRequest(context) {
  const { request, next } = context;
  const ip = request.headers.get("cf-connecting-ip");
  const asn = request.cf ? request.cf.asn : null;

  if (BLOCKED_IPS.includes(ip) || BLOCKED_ASN.includes(asn)) {
    return new Response("Access denied", { status: 403 });
  }

  return next();
}
