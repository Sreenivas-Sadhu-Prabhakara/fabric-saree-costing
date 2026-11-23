# Textile unit-costing calculator

A free, offline, single-page calculator that builds the **true per-metre or per-piece cost** of handloom and tailored textiles — from yarn weight through wastage, job-work, labour and overhead — and shows the break-even and a selling price at your chosen margin. Works in Indian rupees (₹) or Philippine pesos (₱).

## What it does

Given the warp and weft yarn weights (in grams), the yarn rate per kilogram, a wastage percentage, and the per-unit charges for dyeing/printing, embroidery/job-work, labour and overhead, it computes:

- **Yarn cost** — `(warp + weft) ÷ 1000 × rate per kg`
- **Yarn after wastage** — yarn cost grossed up by the wastage percentage
- **True cost (break-even)** — yarn-after-wastage + dyeing + embroidery + labour + overhead
- **Selling price** — true cost plus your margin percentage

It also prints a **margin-bands** table showing the selling price at 10%, 20%, 30% and 40% margin on the true cost, and highlights the band when your chosen margin is one of these.

## Who it's for

Handloom and powerloom weavers, dyers and printers, and boutique or made-to-measure tailors in India and the Philippines who want to price a saree, a running metre of fabric, or a stitched piece consistently and transparently.

## Method / standard

There is no statutory tariff for textile pricing. This follows the conventional mill **cost-sheet method** used across the trade: yarn valued by weight at the rate per kilogram, grossed up for process wastage, plus flat conversion and job-work charges per unit, with margin taken on the resulting cost. The only fixed constants are the 1,000 g = 1 kg conversion and the 10/20/30/40% margin bands.

## How to run

It is a static page with no build step and no network calls. From this folder:

```sh
python3 -m http.server 8137
```

Then open <http://localhost:8137/> in a browser. You can also open `index.html` directly.

## Scope & accuracy

This is an estimate to help you price consistently, not an audited cost statement. It assumes yarn is priced per kilogram and that wastage applies to yarn only; it does not model GST/VAT, count or size variation, shrinkage, sampling or finishing losses. Always sanity-check against your own purchase bills and job-work invoices.

MIT licensed.
