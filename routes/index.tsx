import { useSignal } from "@preact/signals";
import Counter, { CounterProps } from "../islands/Counter.tsx";

export default function Home() {
  const counterProps: CounterProps = {
    buyingPrice: useSignal(100),
    taxRate: useSignal(6),
    capacity: useSignal(100),
    currencyRate: useSignal(24500),
  };
  return <>
    <header class="prose p-4">
      <h1>Tính Giá Nhanh</h1>
      <h2>Nước hoa</h2>
    </header>
    <Counter {...counterProps} />
  </>;
}
