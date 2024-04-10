import { registerIconLibrary } from "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/utilities/icon-library.js";

registerIconLibrary("unicons", {
  resolver: (name) => {
    const match = name.match(/^(.*?)(-s)?$/);
    return `https://cdn.jsdelivr.net/npm/@iconscout/unicons@3.0.3/svg/${
      match[2] === "-s" ? "solid" : "line"
    }/${match[1]}.svg`;
  },
  mutator: (svg) => svg.setAttribute("fill", "currentColor"),
});

await Promise.allSettled([
  // customElements.whenDefined("sl-button"),
  customElements.whenDefined("sl-icon"),
  customElements.whenDefined("sl-input"),
  customElements.whenDefined("sl-textarea"),
]);
document.body.classList.add("ready");
