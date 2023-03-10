import { dropboxFetch, DROPBOX_EP } from './dropboxFetch';

export async function getTemporaryFileDownloadLink(
  filePath: string,
): Promise<string> {
  const data = await dropboxFetch(DROPBOX_EP.GET_TEMPORARY_LINK, {
    path: filePath,
  });
  return data.link;
}
