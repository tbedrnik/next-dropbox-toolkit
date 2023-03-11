import { createHmac } from 'node:crypto';
import type { NextApiRequest } from 'next';
import getRawBody from 'raw-body';

export async function verifyDropboxSignature(req: NextApiRequest) {
  const signature = req.headers['x-dropbox-signature'];
  if (!signature) throw new Error('Missing signature');

  const body = await getRawBody(req);
  if (!body) throw new Error('Invalid body');

  const bodyHexDigest = createHmac(
    'sha256',
    process.env.DROPBOX_APP_SECRET as string,
  )
    .update(body)
    .digest('hex');

  if (bodyHexDigest !== signature) throw new Error('Invalid signature');

  // For convenience assign the parsed body
  req.body = body;
}
