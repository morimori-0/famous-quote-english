import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import deepl from 'deepl'
import { z } from 'zod'

const TranslatePostScheme = z.object({
  text: z.string(),
  target_lang: z.string()
})

export type TranslatePostRequest = z.infer<typeof TranslatePostScheme>

const posttranslate: NextApiHandler = async(req, res) => {
  try{
    const reqData = TranslatePostScheme.parse(req.body)
    deepl({
      free_api: true,
      text: reqData.text,
      target_lang: reqData.target_lang,
      auth_key: process.env.DEEPL_API_KEY,
      }).then(result => {
        return res.status(200).json(result.data)
    })
  }catch(err) {
    res.status(400).end()
  }
}

export default posttranslate