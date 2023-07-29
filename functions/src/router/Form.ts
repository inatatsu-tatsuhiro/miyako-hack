import { Request, Response } from 'express'

export async function formHandler(req: Request, res: Response) {
  res.send('Hello World!')
}