/**
 * @see https://www.dropbox.com/developers/documentation/http/documentation#oauth2-token
 */

type RefreshTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export async function getDropboxAccessToken() {
  const url = new URL('https://api.dropboxapi.com/oauth2/token');

  url.searchParams.set('grant_type', 'refresh_token');
  url.searchParams.set(
    'refresh_token',
    process.env.DROPBOX_REFRESH_TOKEN as string,
  );

  const credentials = `${process.env.DROPBOX_APP_KEY}:${process.env.DROPBOX_APP_SECRET}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(credentials).toString('base64')}`,
    },
  });

  const data: RefreshTokenResponse = await response.json();

  return data.access_token;
}
