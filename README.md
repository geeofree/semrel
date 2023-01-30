# semrel: Semantic Release

A simple semantic release CLI Tool.

## Usage

```sh
npx @geeofree/semrel@latest [<options>]
```

## CLI Options

| Option                    | Description                                                           | Defaults  |
|---------------------------|-----------------------------------------------------------------------|-----------|
| `--initial-version`, `-i` | Sets the initial version of the release.                              | `'1.0.0'` |
| `--suffix`, `-s`          | Sets the suffix of the version name ie. `x.x.x-<suffix>`              | `null`    |
| `--dry-run`, `-d`         | Run the command but don't publish.                                    | `false`   |
| `--draft`                 | Publish a draft release.                                              | `false`   |
| `--pre-release`           | Publish a pre-release.                                                | `false`   |
| `--jira-url`, `--ju`      | The URL for your JIRA board. The commit scope will be appended to it. | `null`    |
| `--validate-jira-links`   | Checks whether the generated JIRA link (JIRA URL + scope) is valid.   | `false`   |

## Config Files

This script will read from the ff. files in order: `.semrel.js`, `.semrel.yaml`, `.semrel.yml`.

The files will be read relative to the working directory of where the command was executed.

> TODO: Document how to write config files.

## Environment Variables

| Variable                   | Description                                                                   | Defaults                 |
|----------------------------|-------------------------------------------------------------------------------|--------------------------|
| `GH_TOKEN`, `GITHUB_TOKEN` | **REQUIRED:** Github token with write permissions on the repository.          | `''`                     |
| `GH_REPOSITORY`            | **REQUIRED:** Github repository in the form of: `'<repo_owner>/<repo_name>'`. | `''`                     |
| `GIT_COMMITTER_NAME`       | The name of the committer when publishing releases.                           | `SemRel Bot`             |
| `GIT_COMMITTER_EMAIL`      | The email of the committer when publishing releases.                          | `semrel-bot@hotmail.com` |
| `SEMREL_DEBUG`             | Provides debugging output.                                                    | `0`                      |
| `VERBOSE`                  | Prints each command execution in the script.                                  | `0`                      |

## Attribution

Most of the code is based off from:

- [Actually you don’t need 'semantic-release' for semantic release](https://dev.to/antongolub/you-don-t-need-semantic-release-sometimes-3k6k)
- [zx-semrel](https://github.com/semrel-extra/zx-semrel)

Both are by: [@antongolub](https://github.com/antongolub)
