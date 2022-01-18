// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { discover } from "../../../controllers/freebox";

export default function handler(req, res) {
  req.body.host = req.body.host || "https://mafreebox.freebox.fr";
  discover(req, res);
}
