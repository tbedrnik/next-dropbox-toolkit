import { dropboxFetch, DROPBOX_EP } from './dropboxFetch';

export async function getFilesInFolder(
  folderPath: string,
): Promise<Array<string>> {
  const entries = [];

  let data = await dropboxFetch(DROPBOX_EP.LIST_FOLDER, {
    path: folderPath,
    recursive: false,
    include_media_info: true,
    include_deleted: false,
    include_has_explicit_shared_members: false,
    include_mounted_folders: false,
    include_non_downloadable_files: false,
    limit: 20,
  });

  if (Array.isArray(data.entries)) {
    entries.push(...data.entries);
  }

  while (data.has_more) {
    data = await dropboxFetch(DROPBOX_EP.LIST_FOLDER_CONTINUE, {
      cursor: data.cursor,
    });

    if (Array.isArray(data.entries)) {
      entries.push(...data.entries);
    }
  }

  return entries.map(entry => entry.path_display.substring(folderPath.length));
}
