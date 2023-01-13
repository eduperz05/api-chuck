import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/errorHandler.ts";

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log(`error ${err.message}`);
    res.header("Content-Type", "application/json");
    res.status(err.statusCode).send(JSON.stringify({ error: err.message }));
  } else {
    next();
  }    
};