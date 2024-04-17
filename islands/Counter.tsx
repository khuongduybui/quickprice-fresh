import type { Signal } from "@preact/signals";
import { computed } from "@preact/signals";
import { Icon } from "../components/Icon.tsx";
import { Input } from "../components/Input.tsx";
import numeral from "numeral";
import { debounce } from "underscore";

export interface CounterProps {
  buyingPrice: Signal<number>;
  taxRate: Signal<number>;
  capacity: Signal<number>;
  currencyRate: Signal<number>;
}

export default function Counter(props: CounterProps) {
  const cost = computed(() => {
    const taxedPrice = props.buyingPrice.value *
      (1 + props.taxRate.value / 100);
    // console.log(`taxedPrice: ${taxedPrice}`);
    const weightInOz = props.capacity.value / 6.25;
    // console.log(`weightInOz: ${weightInOz}`);
    const weight = weightInOz / 16;
    // console.log(`weight: ${weight}`);
    const freight = weight * 5; // TODO: freightRate
    // console.log(`freight: ${freight}`);
    const custom = 6; // TODO: custom
    // console.log(`custom: ${custom}`);
    const cost = taxedPrice + freight + custom;
    // console.log(`cost: ${cost}`);
    return cost;
  });
  const finalPrice = computed(() => {
    const finalPrice = cost.value * 1.1; // TODO: profitRate
    const finalPriceInVnd = finalPrice * props.currencyRate.value;
    const roundedFinalPriceInVnd = Math.ceil(finalPriceInVnd / 50000) * 50000;
    return roundedFinalPriceInVnd;
  });
  const finalPriceInVnd = computed(() =>
    numeral(finalPrice.value).format("0,0")
  );
  const currentInputHandler = (event: InputEvent) => {
    props.currencyRate.value = +(event.target as HTMLInputElement).value;
    fetch("/api/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currencyRate: props.currencyRate.value,
      }),
    });
  };
  return (
    <div class="flex flex-col gap-4 p-4">
      <Input
        type="number"
        label="Giá mua"
        onInput={debounce(
          (
            event: InputEvent,
          ) => (props.buyingPrice.value = +(event.target as HTMLInputElement)
            .value),
          500,
        )}
        value={props.buyingPrice}
      >
        <Icon name="tag" slot="prefix">
          $
        </Icon>
        <code slot="suffix">$</code>
      </Input>
      <Input
        type="number"
        label="Thuế"
        onInput={debounce(
          (
            event: InputEvent,
          ) => (props.taxRate.value = +(event.target as HTMLInputElement)
            .value),
          500,
        )}
        value={props.taxRate}
      >
        <Icon name="percent" slot="prefix">
          $
        </Icon>
        <code slot="suffix">%</code>
      </Input>
      <Input
        type="number"
        label="Dung tích"
        onInput={debounce(
          (
            event: InputEvent,
          ) => (props.capacity.value = +(event.target as HTMLInputElement)
            .value),
          500,
        )}
        value={props.capacity}
      >
        <Icon name="flask" library="unicons" slot="prefix">
          $
        </Icon>
        <code slot="suffix">ml</code>
      </Input>
      <Input
        type="number"
        label="Tỷ giá"
        onInput={debounce(currentInputHandler, 500)}
        value={props.currencyRate}
      >
        <Icon name="cash-coin" slot="prefix">
          $
        </Icon>
        <code slot="suffix">₫/$</code>
        <a
          slot="help-text"
          href="https://wise.com/us/currency-converter/usd-to-vnd-rate?amount=1"
          target="_blank"
        >
          Tham khảo tỷ giá hôm nay
        </a>
      </Input>
      <Input
        label="Giá sau cùng"
        helpText="Đã bao gồm phụ thu hải quan và phí gởi theo cân nặng"
        filled
        readonly
        value={finalPriceInVnd}
      >
        <Icon name="cash-stack" slot="prefix">
          $
        </Icon>
        <code slot="suffix">₫</code>
      </Input>
    </div>
  );
}
