import { JSX } from "preact";

export enum SLInputSize {
  small = "small",
  medium = "medium",
  large = "large",
}

export interface SLInputAttributes {
  size?: SLInputSize;
  label?: string;
  helpText?: string;
}

export function Input(
  props: SLInputAttributes & JSX.HTMLAttributes<HTMLInputElement>,
) {
  const size = props.size ?? SLInputSize.medium;

  return <sl-input size={size} {...props} />;
}
