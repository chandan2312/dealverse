## This website is built with turborepo, so we can use same ui and backend for different websites.

## Here i keep the ui and backend exact same for different website and database is different of every website

## Further i want to add more features like paid plans, user profile controls, personalized recommandation, follow, in app sharing 🙂.

### This is a homepage of website, with all the deals with filters, pagination and sidebar

![](https://github.com/chandan2312/dealverse/blob/main/sc/english-home.png)

## Single Deal Page Where user can see detailed information about the offer. It also has features like upvotes, save, comments, dynamic link redirection and image gallery

![](https://github.com/chandan2312/dealverse/blob/main/sc/english-deal-page.png)

## This is a korean version website using the same repo, but connected to different database only

![](https://github.com/chandan2312/dealverse/blob/main/sc/korea-single%20deal.png)

## There are another features

## Sign in SignUp Popup

![](https://github.com/chandan2312/dealverse/blob/main/sc/english-sign%20in.png)

## Add New Deal Popup

![](https://github.com/chandan2312/dealverse/blob/main/sc/english%20add-new-deal.png)

# Turborepo Tailwind CSS starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-tailwind
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `web`: another [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Building packages/ui

This example is set up to produce compiled styles for `ui` components into the `dist` directory. The component `.tsx` files are consumed by the Next.js apps directly using `transpilePackages` in `next.config.js`. This was chosen for several reasons:

- Make sharing one `tailwind.config.js` to apps and packages as easy as possible.
- Make package compilation simple by only depending on the Next.js Compiler and `tailwindcss`.
- Ensure Tailwind classes do not overwrite each other. The `ui` package uses a `ui-` prefix for it's classes.
- Maintain clear package export boundaries.

Another option is to consume `packages/ui` directly from source without building. If using this option, you will need to update the `tailwind.config.js` in your apps to be aware of your package locations, so it can find all usages of the `tailwindcss` class names for CSS compilation.

For example, in [tailwind.config.js](packages/tailwind-config/tailwind.config.js):

```js
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/ui/*.{js,ts,jsx,tsx}",
  ],
```

If you choose this strategy, you can remove the `tailwindcss` and `autoprefixer` dependencies from the `ui` package.

### Utilities

This Turborepo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
