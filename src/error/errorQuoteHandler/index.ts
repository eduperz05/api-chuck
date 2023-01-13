import { QuoteBadFormat } from "../quoteBadFormat";
import { QuoteNotCreatedError } from "../quoteNotCreated.ts";
import { QuoteNotFoundError } from "../quoteNotFoundError.ts";
import { Response } from "express";


export const errorQuoteHandler = (err: unknown, res: Response) => {
  if (err instanceof QuoteNotFoundError) {
    res.status(500).json({ message: err.message });
  }
  else if (err instanceof QuoteNotCreatedError) {
    res.status(500).json({ message: err.message });
  }
  else if (err instanceof QuoteBadFormat) {
    res.status(500).json({ message: err.message });
  }
  else {
    res.status(400).json({ message: "Unknown error." });
  }
  return;
};