# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Added `SlackModule` (accessed via `.slack` property of the `socialProxy` instance).
- Added `tslib` to dependencies.

### Changed
- Updated `InstagramModule`: read in endpoint from config.

## [0.1.0] - 2017-12-06
### Added
- Complete first pass of `social-proxy.js`, including: `InstagramModule`; `CacheModule`.
- Completed first pass of `demo/`.
- Completed first pass of `docs/`.
- Added configuration and setup files to project: `README.md`; `CHANGELOG.md`; `package.json`; `.gitignore`.
- Added development dependencies: `browserify`; ; `gulp`; `gulp-typedoc`; `gulp-typescript`; `tsify`; `typedoc`; `typescript`; `vinyl-source-stream`.
