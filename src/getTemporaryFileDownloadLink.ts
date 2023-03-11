import { getDropboxAccessToken } from './getDropboxAccessToken';
import { dropboxFetch, DROPBOX_EP } from './dropboxFetch';

export async function getTemporaryFileDownloadLink(
  filePath: string,
): Promise<string> {
  const token = await getDropboxAccessToken();
  const data = await dropboxFetch(DROPBOX_EP.GET_TEMPORARY_LINK, token, {
    path: filePath,
  });
  return data.link;
}
