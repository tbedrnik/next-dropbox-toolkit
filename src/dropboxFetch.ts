export const enum DROPBOX_EP {
  LIST_FOLDER = 'list_folder',
  LIST_FOLDER_CONTINUE = 'list_folder/continue',
  GET_TEMPORARY_LINK = 'get_temporary_link',
}

export async function dropboxFetch(ep: DROPBOX_EP, token: string, body: any) {
  const url = new URL(ep, 'https://api.dropboxapi.com/2/files/');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
}
