// 需要拦截的可疑IP列表
const BLOCKED_IPS = [
  "165.154.1.81",
  "101.36.123.60"
];

// 需要拦截的云服务商 ASN(UCLOUD HK)
const BLOCKED_ASN = [135377];

export async function onRequest(context) {
  const { request, next } = context;
  const ip = request.headers.get("cf-connecting-ip");
  const asn = request.cf ? request.cf.asn : null;

  if (BLOCKED_IPS.includes(ip) || BLOCKED_ASN.includes(asn)) {
    return new Response("Access denied", { status: 403 });
  }

  return next();
}
