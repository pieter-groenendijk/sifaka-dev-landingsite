export interface License {
  id: string,
  price: string,
  pricePostFix: string|null,
  name: string,
  summary: string,
  shortTerms: string[],
  longTermsURL: string,
}

export const licenses: License[] = [
  {
    id: "trial",
    price: "Free",
    pricePostFix: null,
    name: "Trial",
    summary: "Freely try out the software; all functionality, except for loading project files, is indefinitely made available with no cost.",
    shortTerms: [
      "Free",
      "Use any supported release",
      "Loading project files not possible"
    ],
    longTermsURL: "",
  },
  {
    id: "non-commercial",
    price: "Free",
    pricePostFix: null,
    name: "Non-commercial",
    summary: "A free license for all non-commercial use. Mislabeling your usage as such may have consequences. Best if you’re eligible — it’s free. ",
    shortTerms: [
      "Free",
      "Use any supported release",
      "Non-commercial use only (mislabeling may have consequences)",
    ],
    longTermsURL: "",
  },
  {
    id: "rent",
    price: "€ 20",
    pricePostFix: " / month",
    name: "Rent / Pay in Installments",
    summary: "A monthly paid for license, that grants a perpetual license after 12 months active. Best if you’re uncertain, want flexibility, or expect non-continuous usage.",
    shortTerms: [
      "Monthly payments",
      "For every 12 months active, a perpetual license is granted",
      "Price remains fixed while active under normal conditions",
      "Optionally specify the active period beforehand",
      "Optionally allow to automatically renew",
    ],
    longTermsURL: "",
  },
  {
    id:"buy",
    price: "€ 240",
    pricePostFix: null,
    name: "Buy Once; Own Forever",
    summary: "A one-time paid for perpetual license. Best if you’re certain, want complete predictability, or expect continuous usage.",
    shortTerms: [
      "One payment beforehand",
      "Use the specified release from supported releases",
      "Active for perpetuity",
    ],
    longTermsURL: "",
  },
]
