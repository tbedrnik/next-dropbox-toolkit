import type { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { verifyDropboxSignature } from './verifyDropboxSignature';

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export function createWebhookHandler(
  onSuccess?: (
    req: NextApiRequest,
    res: NextApiResponse,
  ) => void | Promise<void>,
  onError?: (res: NextApiResponse, error: any) => void | Promise<void>,
) {
  return async function dropboxWebhookHandler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    /**
     * @see https://www.dropbox.com/developers/reference/webhooks#verification
     */
    if (req.method === 'GET') {
      const { challenge } = req.query;
      res.setHeader('Content-Type', 'text/plain');
      res.send(challenge);
      return;
    }

    /**
     * @see https://www.dropbox.com/developers/reference/webhooks#notifications
     */
    if (req.method === 'POST') {
      try {
        await verifyDropboxSignature(req);
        await onSuccess?.(req, res);

        if (res.writable) {
          return res.end('');
        }
      } catch (error: any) {
        await onError?.(res, error);

        if (res.writable) {
          return res.status(500).end(error.message);
        }
      }
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end('Method not allowed');
  };
}
