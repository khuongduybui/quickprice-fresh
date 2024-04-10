import type { Signal } from "@preact/signals";
import { Icon } from "../components/Icon.tsx";
import { Input } from "../components/Input.tsx";
import numeral from "numeral";

export interface CounterProps {
  buyingPrice: Signal<number>;
  taxRate: Signal<number>;
  capacity: Signal<number>;
  currencyRate: Signal<number>;
}

export const calculateCost = (props: CounterProps) => {
  const taxedPrice = props.buyingPrice.value * (1 + props.taxRate.value / 100);
  console.log(`taxedPrice: ${taxedPrice}`);
  const weightInOz = props.capacity.value / 6.25;
  console.log(`weightInOz: ${weightInOz}`);
  const weight = weightInOz / 16;
  console.log(`weight: ${weight}`);
  const freight = weight * 5; // TODO: freightRate
  console.log(`freight: ${freight}`);
  const custom = 6; // TODO: custom
  console.log(`custom: ${custom}`);
  const cost = taxedPrice + freight + custom;
  console.log(`cost: ${cost}`);
  return cost;
};

export const calculateCostInVnd = (props: CounterProps) => {
  const cost = calculateCost(props);
  return cost * props.currencyRate.value;
};

export const calculateFinalPriceInVnd = (props: CounterProps) => {
  const cost = calculateCost(props);
  const finalPrice = cost * 1.1; // TODO: profitRate
  const finalPriceInVnd = finalPrice * props.currencyRate.value;
  const roundedFinalPriceInVnd = Math.ceil(finalPriceInVnd / 50000) * 50000;
  return roundedFinalPriceInVnd;
};

export default function Counter(props: CounterProps) {
  return (
    <div class="flex flex-col gap-4 p-4">
      <Input
        type="number"
        label="Giá mua"
        onInput={(event: InputEvent) =>
          props.buyingPrice.value = +((event.target as HTMLInputElement).value)}
        value={props.buyingPrice}
      >
        <Icon name="tag" slot="prefix">$</Icon>
        <code slot="suffix">$</code>
      </Input>
      <Input
        type="number"
        label="Thuế"
        onInput={(event: InputEvent) =>
          props.taxRate.value = +((event.target as HTMLInputElement).value)}
        value={props.taxRate}
      >
        <Icon name="percent" slot="prefix">$</Icon>
        <code slot="suffix">%</code>
      </Input>
      <Input
        type="number"
        label="Dung tích"
        onInput={(event: InputEvent) =>
          props.capacity.value = +((event.target as HTMLInputElement).value)}
        value={props.capacity}
      >
        <Icon name="flask" library="unicons" slot="prefix">$</Icon>
        <code slot="suffix">ml</code>
      </Input>
      <Input
        type="number"
        label="Tỷ giá"
        onInput={(event: InputEvent) =>
          props.currencyRate.value =
            +((event.target as HTMLInputElement).value)}
        value={props.currencyRate}
      >
        <Icon name="cash-coin" slot="prefix">$</Icon>
        <code slot="suffix">₫/$</code>
      </Input>
      <Input
        label="Giá sau cùng"
        helpText="Đã bao gồm phụ thu hải quan và phí gởi theo cân nặng"
        filled
        readonly
        value={numeral(calculateFinalPriceInVnd(props)).format("0,0")}
      >
        <Icon name="cash-stack" slot="prefix">$</Icon>
        <code slot="suffix">₫</code>
      </Input>
    </div>
  );
}
