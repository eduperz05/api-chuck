import { Request, Response } from "express";
import { QuoteRepositorySequelize } from "../../repositories/quote/index";
import { createQuote, findRandom, findByWord, findByCategory } from "../../../service/quote";
import { errorQuoteHandler } from "../../../error/errorQuoteHandler/index";


export const createController = async(req: Request, res: Response) => {
  try {
    if (!req.body.message || !req.body.category) {
      res.status(400).json({ message: "Missing message or category" });
      return;
    }
    const repository = new QuoteRepositorySequelize();
    const quote = await createQuote({
      message: req.body.message,
      category: req.body.category
    }, repository);
    res.status(200).json({ message: "Quote created", quote });
  } catch (err) {
    errorQuoteHandler(err, res);
  }
  return;
};

export const randomController = async(req: Request, res: Response) => {
  try {
    const repository = new QuoteRepositorySequelize();
    const quote = await findRandom(repository);
    res.status(200).json({ message: "Quote created", quote });
  } catch (err) {
    errorQuoteHandler(err, res);
  }
  return;
};

export const wordController = async(req: Request, res: Response) => {
  try {
    if (!req.params.word) {
      res.status(400).json({ message: "Missing word" });
      return;
    }
    const repository = new QuoteRepositorySequelize();
    const quote = await findByWord(req.params.word, repository);
    res.status(200).json({ message: "Quote created", quote });
  } catch (err) {
    errorQuoteHandler(err, res);
  }
  return;
};

export const categoryController = async(req: Request, res: Response) => {
  try {
    if (!req.params.category) {
      res.status(400).json({ message: "Missing category" });
      return;
    }
    const repository = new QuoteRepositorySequelize();
    const quote = await findByCategory(req.params.category, repository);
    res.status(200).json({ message: "Quote created", quote });
  } catch (err) {
    errorQuoteHandler(err, res);
  }
  return;
};