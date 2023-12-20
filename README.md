This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Credentials

NOTE: HARD CODING CREDENTIALS SHOULD NOT BE DONE IN PRODUCTION
Update lib/config.ts with your AWS user credentials.

### Run the application

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### To add a custom model:

- Edit components/ModelConfig.tsx line 24 add param objects specific to your model
- Edit components/ModelConfig.tsx line 72 add model dropdown value
- Edit components/ModelConfig.tsx line 48 function updateModelParameters and add a conditional that sets the respective params for your model to the modelParams object.

page.tsx line 56 add new ChatComponent logic for new model with respective params for your model
