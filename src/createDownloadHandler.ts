import { NextApiRequest, NextApiResponse } from 'next';
import { getTemporaryFileDownloadLink } from './getTemporaryFileDownloadLink';

export function createDownloadHandler(onError?: (error: any) => void) {
  return async function downloadHandler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === 'GET') {
      try {
        const { path: filePath } = req.query;

        if (typeof filePath !== 'string') {
          throw new Error('Invalid or missing parameter `path`');
        }

        const downloadLink = await getTemporaryFileDownloadLink(filePath);

        res.redirect(downloadLink);
      } catch (error) {
        onError?.(error);
        res.status(500).end(error.message);
      }
      return;
    }

    res.setHeader('Allow', ['GET']);
    res.status(405).end('Method not allowed');
  };
}
