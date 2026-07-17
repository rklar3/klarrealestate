export type MortgageInput = {
  homePrice: number;
  downPayment: number;
  annualRatePercent: number;
  amortizationYears: number;
};

export type MortgageResult = {
  loanAmount: number;
  monthlyPayment: number;
  totalPerYear: number;
};

// Standard fixed-rate amortization formula, compounded semi-annually per
// Canadian mortgage convention, converted to an effective monthly rate.
export function calculateMortgage({
  homePrice,
  downPayment,
  annualRatePercent,
  amortizationYears,
}: MortgageInput): MortgageResult {
  const loanAmount = Math.max(homePrice - downPayment, 0);
  const numPayments = amortizationYears * 12;

  if (loanAmount <= 0 || annualRatePercent <= 0 || numPayments <= 0) {
    return { loanAmount, monthlyPayment: 0, totalPerYear: 0 };
  }

  const semiAnnualRate = annualRatePercent / 100 / 2;
  const monthlyRate = Math.pow(1 + semiAnnualRate, 1 / 6) - 1;

  const monthlyPayment =
    (loanAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -numPayments));

  return {
    loanAmount,
    monthlyPayment,
    totalPerYear: monthlyPayment * 12,
  };
}

export function formatCurrencyCAD(amount: number, fractionDigits = 0): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(amount);
}
