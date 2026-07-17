"use client";

import { useId, useMemo, useState } from "react";
import { calculateMortgage, formatCurrencyCAD } from "@/lib/mortgage";
import { Card } from "@/components/ui/Card";

const AMORTIZATION_OPTIONS = [15, 20, 25, 30];

export function MortgageCalculator({
  initialPrice = 750_000,
  title = "Mortgage calculator",
}: {
  initialPrice?: number;
  title?: string;
}) {
  const [homePrice, setHomePrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [rate, setRate] = useState(5.25);
  const [amortization, setAmortization] = useState(25);

  const priceId = useId();
  const downId = useId();
  const rateId = useId();
  const amortId = useId();

  const downPayment = useMemo(
    () => Math.round((homePrice * downPaymentPercent) / 100),
    [homePrice, downPaymentPercent],
  );

  const result = useMemo(
    () =>
      calculateMortgage({
        homePrice,
        downPayment,
        annualRatePercent: rate,
        amortizationYears: amortization,
      }),
    [homePrice, downPayment, rate, amortization],
  );

  return (
    <Card className="p-6 sm:p-8">
      <h3 className="text-2xl">{title}</h3>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={priceId} className="flex justify-between text-sm font-medium text-ink">
            <span>Home price</span>
            <span>{formatCurrencyCAD(homePrice)}</span>
          </label>
          <input
            id={priceId}
            type="range"
            min={200_000}
            max={3_000_000}
            step={5_000}
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="mt-2 w-full accent-terracotta"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={downId} className="flex justify-between text-sm font-medium text-ink">
            <span>Down payment</span>
            <span>
              {downPaymentPercent}% — {formatCurrencyCAD(downPayment)}
            </span>
          </label>
          <input
            id={downId}
            type="range"
            min={5}
            max={100}
            step={1}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="mt-2 w-full accent-terracotta"
          />
        </div>

        <div>
          <label htmlFor={rateId} className="text-sm font-medium text-ink">
            Interest rate (%)
          </label>
          <input
            id={rateId}
            type="number"
            min={0}
            max={20}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2 w-full rounded-control border border-muted-3/60 bg-cream px-3 py-2 text-ink"
          />
        </div>

        <div>
          <label htmlFor={amortId} className="text-sm font-medium text-ink">
            Amortization
          </label>
          <select
            id={amortId}
            value={amortization}
            onChange={(e) => setAmortization(Number(e.target.value))}
            className="mt-2 w-full rounded-control border border-muted-3/60 bg-cream px-3 py-2 text-ink"
          >
            {AMORTIZATION_OPTIONS.map((years) => (
              <option key={years} value={years}>
                {years} years
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 rounded-card bg-sand p-6">
        <p className="eyebrow text-terracotta-dark">Estimated monthly payment</p>
        <p className="mt-2 font-display text-4xl">
          {formatCurrencyCAD(result.monthlyPayment, 0)}
          <span className="text-base font-sans text-muted-1"> / month</span>
        </p>
        <dl className="mt-4 grid grid-cols-1 gap-2 text-sm text-muted-1 sm:grid-cols-3">
          <div>
            <dt className="font-medium text-ink">Home price</dt>
            <dd>{formatCurrencyCAD(homePrice)}</dd>
          </div>
          <div>
            <dt className="font-medium text-ink">Down payment</dt>
            <dd>{formatCurrencyCAD(downPayment)}</dd>
          </div>
          <div>
            <dt className="font-medium text-ink">Mortgage amount</dt>
            <dd>{formatCurrencyCAD(result.loanAmount)}</dd>
          </div>
        </dl>
      </div>

      <p className="mt-4 text-xs text-muted-2">
        This calculator provides an estimate of principal and interest only — it excludes taxes,
        insurance, and strata/condo fees, and is not a lending offer or pre-approval. Contact a
        mortgage professional for exact figures.
      </p>
    </Card>
  );
}
