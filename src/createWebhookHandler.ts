import type { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { verifyDropboxSignature } from './verifyDropboxSignature';

const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export function createWebhookHandler(
  onSuccess?: (res: NextApiResponse) => void | Promise<void>,
  onError?: (res: NextApiResponse, error: any) => void | Promise<void>,
) {
  async function dropboxWebhookHandler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    // https://www.dropbox.com/developers/reference/webhooks#verification
    if (req.method === 'GET') {
      const { challenge } = req.query;
      res.setHeader('Content-Type', 'text/plain');
      res.send(challenge);
      return;
    }

    // https://www.dropbox.com/developers/reference/webhooks#notifications
    if (req.method === 'POST') {
      try {
        await verifyDropboxSignature(req);
        await onSuccess?.(res);

        if (res.writable) {
          return res.end('');
        }
      } catch (error) {
        await onError?.(res, error);

        if (res.writable) {
          return res.status(500).end(error.message);
        }
      }
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end('Method not allowed');
  }

  return { handler: dropboxWebhookHandler, config };
}
