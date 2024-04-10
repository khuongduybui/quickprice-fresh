import { JSX } from "preact";

export enum SLButtonVariant {
  default = "default",
  primary = "primary",
  neutral = "neutral",
  success = "success",
  warning = "warning",
  danger = "danger",
  text = "text",
}

export enum SLButtonSize {
  small = "small",
  medium = "medium",
  large = "large",
}

export interface SLButtonAttributes {
  variant?: SLButtonVariant;
  size?: SLButtonSize;
}

export function Button(
  props:
    & JSX.HTMLAttributes<HTMLButtonElement>
    & JSX.HTMLAttributes<HTMLLinkElement>
    & SLButtonAttributes,
) {
  const variant = props.variant ?? SLButtonVariant.default;
  const size = props.size ?? SLButtonSize.medium;

  return <sl-button variant={variant} size={size} {...props} />;
}
