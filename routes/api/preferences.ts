import { FreshContext, Handlers } from "$fresh/server.ts";

const prodEndpoint = Deno.env.get("DENO_KV_PROD_ENDPOINT");
const kv = await (prodEndpoint ? Deno.openKv(prodEndpoint) : Deno.openKv());

export const handler: Handlers = {
  async GET(_req, _ctx): Promise<Response> {
    const [
      currencyRate,
    ] = await Promise.all([
      kv.get(["preferences", "currencyRate"]),
    ]);

    return new Response(JSON.stringify({ currencyRate: currencyRate.value }));
  },
  async POST(req: Request, _ctx: FreshContext): Promise<Response> {
    const body = await req.json();

    const setters = [];
    if (body.currencyRate) {
      setters.push(kv.set(["preferences", "currencyRate"], body.currencyRate));
    }
    await Promise.all(setters);

    return new Response();
  },
};
