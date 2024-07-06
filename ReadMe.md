# Git Fusion

A simple utility to fetch and store Git information such as the last commit details and current branch into a `.GIT_FUSION` file in the project root. This package can be easily integrated into your build process.

## Features

- Fetches last commit ID
- Fetches last commit message
- Fetches last commit author
- Fetches last commit timestamp
- Fetches current branch

## Installation

Install `git-fusion`:

```bash
yarn add -D git-fusion
```

```bash
npm install --save-dev git-fusion
```


### Settings
<ul><li>Set <code>NODE_GIT_FUSION_FILE_TYPE</code> to <code>json</code> to store Git information in JSON format.</li><li>Set <code>NODE_GIT_FUSION_FILE_TYPE</code> to <code>null</code> to store Git information in key=value format.</li></ul>



### Contributing
We're open to all community contributions! If you'd like to contribute in any way, please open Pull Request.

