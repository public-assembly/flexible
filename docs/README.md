# Contribution Guidelines
URL: https://flexible-docs.vercel.app/

Thanks for giving a little extra love to our docs! Below are some basic guidelines to follow to get your PR merged :)

## Creating a Pull Request

- Fork the repository.
- On your copy of the repo, create a new branch. Be sure that your branch contains the most recent changes from the main branch.
- Make any necessary changes, then commit and push them to your fork.
- Go to the main docs repo in your browser and open a new pull request.
- Title the pull request to describe your contribution, and include a short summary of the changes. If an open issue is associated with your changes, tag the issue by referencing the issue number ( i.e., #123) in the pull request summary.
- If there is a relevant tag like "typo", "bug", or "enhancement", include the tag in the PR.

## A standard flow to set up a fork

Set up your fork with the following terminal commands, or an alteration of them to suit your environment:

```
git remote add upstream https://github.com/public-assembly/flexible-dao-interfaces-docs.git
git fetch upstream
git pull --rebase upstream main
git checkout -b "<your-name>/my-contribution"
```

## Website

This is built on an open source template for creating documentation with [Nextra](https://nextra.site).

## Local Development

First, run `yarn` to install the dependencies.

Then, run `yarn dev` to start the development server and visit localhost:3000.

## License

This project is licensed under the MIT License.
