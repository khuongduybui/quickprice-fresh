// import { IS_BROWSER } from "$fresh/runtime.ts";

export interface SLIconAttributes {
  name: string;
  library?: string;
  slot?: string;
}

export function Icon(props: SLIconAttributes) {
  return <sl-icon {...props} />;
  // return IS_BROWSER ? <sl-icon {...props} /> : <></>;
}
