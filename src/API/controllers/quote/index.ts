import { Request, Response } from "express";
import { QuoteRepositoryAxios } from "../../repositories/quote/index";
import { findRandom, findByWord } from "../../../service/quote";
import { errorQuoteHandler } from "../../../error/errorQuoteHandler/index";
import { HistoryRepositorySequelize } from "../../repositories/history";
import paginate from "express-paginate";
import { EmailHelperNodemailer } from "../../../utils/helpers/emailHelper";
import util from "util";


export const randomController = async(req: Request, res: Response) => {
  try {
    const repository = new QuoteRepositoryAxios();
    const quote = req.params.category ? await findRandom(repository, req.params.category)
      : await findRandom(repository);
    res.status(200).json(quote);
  } catch (err) {
    errorQuoteHandler(err, res);
  }
  return;
};

export const searchController = async(req: Request, res: Response) => {
  try {
    if (!req.params.search) {
      res.status(400).json({ message: "Missing search parameter" });
      return;
    }
    const sendMail = req.query.sendMail ? true : false;
    const options = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      skip: Number(req.skip)
    };
    const repositoryAxios = new QuoteRepositoryAxios();
    const repositorySequelize = new HistoryRepositorySequelize();
    const emailHelper = new EmailHelperNodemailer();

    const quotes = await findByWord(req.params.search, options, repositoryAxios, repositorySequelize);
    const content = {
      quotes: quotes.rows,
      pageCount: Math.ceil(quotes.count / options.limit),
      itemCount: quotes.count,
      pages: paginate.getArrayPages(req)(9, Math.ceil(quotes.count / options.limit), options.page)
    };
    if (sendMail){
      if (!req.body.to) {
        res.status(400).json({ message: "Missing email to send data." });
        return;
      }
      const { to } = req.body;
      const mailData = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: `Chuck Norris facts with ${req.params.search} in.`,
        text: util.inspect(content, { showHidden: false, depth: null })
      };
      emailHelper.sendEmail(mailData, res);
      return;
    }
    res.status(200).json(content);
  } catch (err) {
    errorQuoteHandler(err, res);
  }
  return;
};