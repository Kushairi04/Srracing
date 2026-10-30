import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const KEY = "spx:visitors";

export default async function handler(req, res) {
  try {
    const count =
      req.method === "POST"
        ? await redis.incr(KEY)
        : (await redis.get(KEY)) ?? 0;

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ count: Number(count) });
  } catch (err) {
    console.error("Visitor API error:", err);
    res.status(500).json({ error: "Gagal memuatkan kiraan" });
  }
}

