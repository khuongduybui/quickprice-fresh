import { effect, useSignal, useSignalEffect } from "@preact/signals";
import Counter, { CounterProps } from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

type CounterPropsDefault = {
  currencyRate: number;
};

export const handler: Handlers<CounterPropsDefault> = {
  async GET(_req, ctx) {
    const prodEndpoint = Deno.env.get("DENO_KV_PROD_ENDPOINT");
    const kv = await (prodEndpoint ? Deno.openKv(prodEndpoint) : Deno.openKv());

    const [
      currencyRate,
    ] = await Promise.all([
      kv.get(["preferences", "currencyRate"]),
    ]);
    const defaultCounterProps = {
      currencyRate: currencyRate.value,
    };
    return ctx.render(defaultCounterProps);
  },
};

export default function Home(defaultCounterProps: PageProps<CounterPropsDefault>) {
  const counterProps: CounterProps = {
    buyingPrice: useSignal(100),
    taxRate: useSignal(6),
    capacity: useSignal(100),
    currencyRate: useSignal(defaultCounterProps.data.currencyRate),
  };

  return (
    <>
      <header class="prose p-4">
        <h1>Tính Giá Nhanh</h1>
        <h2>Nước hoa</h2>
      </header>
      <Counter {...counterProps} />
      <footer class="px-4">
        <sl-textarea label="Ghi chú" rows="1" resize="auto"></sl-textarea>
      </footer>
    </>
  );
}
