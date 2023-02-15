# Getting Started

1 - Install all packages using NPM

`npm install --force`

2 - Create an startup script called `apps/wish-server/local.sh` and set your environments:

```sh
#!/bin/sh
export GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
export GOOGLE_SECRET="YOUR_GOOGLE_SECRET"
export GOOGLE_CALLBACK_URL="http://localhost:3333/api/v1/auth/google/login"
export APP_REDIRECT="http://localhost:4200"

export AWS_SES_SMTP_PASS="YOUR_SES_PASS"
export AWS_SES_SMTP_USER="YOUR_SES_USER"
export AUTH_JWT_SECRET="AGYSDFÇ1O4´G3O413;4G1R123454RWDFAW23[34[50271LS;ÇÇSSSbu23ub287msasd42wish"
export SLACK_BOT_TOKEN="YOUR_SLACK_BOT_TOKEN"

export DATABASE_TYPE="mysql" # Required!
export DATABASE_HOST="HOST" # Required!
export DATABASE_PORT="3306" # Required!
export DATABASE_USERNAME="USERNAME" # Required!
export DATABASE_PASS="PASS" # Required!
export DATABASE_NAME="wish_local" # Required!

export BASE_API_PATH="http://localhost:3333/api"
export BASE_APP_PATH="http://localhost:4200"

export AWS_S3_ACCESS_KEY_ID="YOUR_S3_ACCESS_KEY" # Required
export AWS_S3_SECRET_ACCESS_KEY="YOUR_S3_SECRET" # Required
export AWS_S3_BUCKET="listaideal" # Required
export AWS_S3_REGION="us-east-1" # Required

export SHOPEE_APP_ID="YOUR_SHOPEE_CREDENTIALS"
export SHOPEE_SECRET="YOUR_SHOPEE_SECRET"
```

3 - Run migrations against the database:

`npm run wish-server:migration:run`

4 - Start the project (both frontend and backend):

`npm run serve-wish`
