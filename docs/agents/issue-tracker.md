# Issue tracker: GitHub

Issues and specs live in mananjen/portfolio-website on GitHub.
Use the gh CLI from this repository.

- Publish a ticket: `gh issue create --title "..." --body-file <file>`
- Read a ticket: `gh issue view <number> --json number,title,body,labels,comments`
- List tickets: `gh issue list --state open`
- Apply labels: `gh issue edit <number> --add-label "..."`
- Remove labels: `gh issue edit <number> --remove-label "..."`
- Comment: `gh issue comment <number> --body-file <file>`
- Close: `gh issue close <number>`

For multiline content, write the text to a temporary file and use `--body-file`.

PRs as a request surface: no.
