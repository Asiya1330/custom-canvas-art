import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req,"handler");
    const { prompt, aspect_ratio, resolution } = req.body;

    try {
      alert("f");
      const response = await axios.post('https://api.stability.ai/v2beta/stable-image/generate/ultra', {
        prompt,
        aspect_ratio,
        resolution
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      res.status(200).json(response.data);
    } catch (error:any) {
      console.log("er");
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  // } else {
  //   res.setHeader('Allow', ['POST']);
  //   res.status(405).end(`Method ${req.method} Not Allowed`);
  // }
}
