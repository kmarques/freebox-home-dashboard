// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { create } from "@/controllers/freebox";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        create(req, res);
        break;
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
