<h2 align="center">
    npm-template
</h2>

<p align="center">
  <a href="https://badge.fury.io/js/studip-api.svg"><img src="https://badge.fury.io/js/studip-api.svg" alt="npm package" /></a>
  <a href="https://img.shields.io/github/license/FireboltCasters/studip-api"><img src="https://img.shields.io/github/license/FireboltCasters/studip-api" alt="MIT" /></a>
  <a href="https://img.shields.io/github/last-commit/FireboltCasters/studip-api?logo=git"><img src="https://img.shields.io/github/last-commit/FireboltCasters/studip-api?logo=git" alt="last commit" /></a>
  <a href="https://www.npmjs.com/package/studip-api"><img src="https://img.shields.io/npm/dm/studip-api.svg" alt="downloads week" /></a>
  <a href="https://www.npmjs.com/package/studip-api"><img src="https://img.shields.io/npm/dt/studip-api.svg" alt="downloads total" /></a>
  <a href="https://github.com/FireboltCasters/studip-api"><img src="https://shields.io/github/languages/code-size/FireboltCasters/studip-api" alt="size" /></a>
  <a href="https://david-dm.org/FireboltCasters/studip-api"><img src="https://david-dm.org/FireboltCasters/studip-api/status.svg" alt="dependencies" /></a>
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FFireboltCasters%2Fstudip-api?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FFireboltCasters%2Fstudip-api.svg?type=shield"/></a>
  <a href="https://github.com/google/gts" alt="Google TypeScript Style"><img src="https://img.shields.io/badge/code%20style-google-blueviolet.svg"/></a>
  <a href="https://shields.io/" alt="Google TypeScript Style"><img src="https://img.shields.io/badge/uses-TypeScript-blue.svg"/></a>
  <a href="https://github.com/marketplace/actions/lint-action"><img src="https://img.shields.io/badge/uses-Lint%20Action-blue.svg"/></a>
</p>

<p align="center">
  <a href="https://github.com/FireboltCasters/studip-api/actions/workflows/npmPublish.yml"><img src="https://github.com/FireboltCasters/studip-api/actions/workflows/npmPublish.yml/badge.svg" alt="Npm publish" /></a>
  <a href="https://github.com/FireboltCasters/studip-api/actions/workflows/linter.yml"><img src="https://github.com/FireboltCasters/studip-api/actions/workflows/linter.yml/badge.svg" alt="Build status" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_studip-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_studip-api&metric=alert_status" alt="Quality Gate" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_studip-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_studip-api&metric=bugs" alt="Bugs" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_studip-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_studip-api&metric=coverage" alt="Coverage" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_studip-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_studip-api&metric=code_smells" alt="Code Smells" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_studip-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_studip-api&metric=duplicated_lines_density" alt="Duplicated Lines (%)" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_studip-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_studip-api&metric=sqale_rating" alt="Maintainability Rating" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_studip-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_studip-api&metric=reliability_rating" alt="Reliability Rating" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_studip-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_studip-api&metric=security_rating" alt="Security Rating" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_studip-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_studip-api&metric=sqale_index" alt="Technical Debt" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_studip-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_studip-api&metric=vulnerabilities" alt="Vulnerabilities" /></a>
</p>

<p align="center">
    npm-template
</p>

## About

This package should help to communicate with a specific Stud.IP instance by using its REST-API. Please not the disclaimer on the bottom. Please note, that oAuth is a better form for authentification but due to restrictions to obtain the specific secrets this is some sort of workaround.

A full documentation of the official Stud.IP instance can be found here: http://docs.studip.de/develop/Entwickler/RESTAPI

## Installation

```
npm i studip-api
```

## Usage example

```javascript
import {Client} from 'studip-api';

async function userLogin() {
  const domain = 'https://<yourStudIP_Domain>.de';
  const username = '<username>';
  const password = '<password>';

  try {
    const client = await Connector.getClient(domain, username, password);

    // to get user informations
    const user = client.getUser();

    // to get the current schedule
    const schedule = await client.loadSchedule();
  } catch (err) {
    console.log('incorrect password or other error');
  }
}
```

## Disclaimer

This project is not officialy associated in any form with the Stud.IP product and does not claims to be part of the development.

## Contributors

The FireboltCasters

<a href="https://github.com/FireboltCasters/studip-api"><img src="https://contrib.rocks/image?repo=FireboltCasters/studip-api" alt="Contributors" /></a>
