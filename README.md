# NextJS + Dropbox API tools

Tools for using some of Dropbox API in your NextJS app. List files from any folder on your static page and benefit from automatic revalidation based on Dropbox webhooks.

## Environment variables

| Variable name           | Description                  |
| ----------------------- | ---------------------------- |
| `DROPBOX_APP_KEY`       | Your app's key               |
| `DROPBOX_APP_SECRET`    | Your app's secret            |
| `DROPBOX_REFRESH_TOKEN` | Never-expiring refresh token |

## Creating a Dropbox app

TODO: Write docs for app creation

## Obtaining refresh token

1. Replace the variable in the link below with your app's key and visit the URL in a browser:

```
https://www.dropbox.com/oauth2/authorize?client_id=<DROPBOX_APP_KEY>&token_access_type=offline&response_type=code
```

2. Authorize the app access and copy the `<ACCESS_CODE>`
3. Replace variables in the `curl` request below:

```
curl --location --request POST 'https://api.dropboxapi.com/oauth2/token' \
-u '<DROPBOX_APP_KEY>:<DROPBOX_APP_SECRET>' \
-H 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'code=<ACCESS_CODE>' \
--data-urlencode 'grant_type=authorization_code'
```

4. Execute the command and copy the `refresh_token`
