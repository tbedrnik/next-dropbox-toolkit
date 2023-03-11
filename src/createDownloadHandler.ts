import { NextApiRequest, NextApiResponse } from 'next';
import { getTemporaryFileDownloadLink } from './getTemporaryFileDownloadLink';

export function createDownloadHandler(
  getFilePath: (req: NextApiRequest) => string,
  onError?: (res: NextApiResponse, error: any) => void | Promise<void>,
) {
  return async function downloadHandler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === 'GET') {
      try {
        const filePath = getFilePath(req);
        const downloadLink = await getTemporaryFileDownloadLink(filePath);

        res.redirect(downloadLink);
      } catch (error: any) {
        await onError?.(res, error);

        if (res.writable) {
          return res.status(500).end(error.message);
        }
      }
      return;
    }

    res.setHeader('Allow', ['GET']);
    res.status(405).end('Method not allowed');
  };
}
