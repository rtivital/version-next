# version-next

`version-next` package provides a function to get the next sematic version from the current version.

## Installation

```bash
yarn add version-next
```

```bash
npm install version-next
```

## Usage

```tsx
import { getNextVersion } from 'version-next';

// Regular versions
// Available types: patch, minor, major
getNextVersion('1.0.0', { type: 'patch' }); // 1.0.1
getNextVersion('1.0.1', { type: 'minor' }); // 1.1.0
getNextVersion('1.1.0', { type: 'major' }); // 2.0.0

// Stage versions
// Available stages: alpha, beta, rc
getNextVersion('1.0.0', { type: 'patch', stage: 'alpha' }); // 1.0.1-alpha.0
getNextVersion('1.0.1-alpha.0', { type: 'patch', stage: 'alpha' }); // 1.0.1-alpha.1
getNextVersion('1.0.0', { type: 'minor', stage: 'beta' }); // 1.1.0-beta.0
getNextVersion('1.1.0-beta.0', { type: 'minor', stage: 'beta' }); // 1.1.0-beta.1
getNextVersion('1.0.1-alpha.0', { type: 'patch', stage: 'beta' }); // 1.0.1-beta.0
getNextVersion('1.0.1-alpha.0', { type: 'patch' }); // 1.0.1
```

## Exported types

```tsx
export type VersionIncrement = 'patch' | 'minor' | 'major' | (string & {});
export type VersionStage = 'alpha' | 'beta' | 'rc' | (string & {});

export interface GetNextVersionOptions {
  type: VersionIncrement;
  stage?: VersionStage;
}
```

## License

MIT
