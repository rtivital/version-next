export type VersionIncrement = 'patch' | 'minor' | 'major' | (string & {});
export type VersionStage = 'alpha' | 'beta' | 'rc' | (string & {});

function getUpdatedVersion(version: string, type: VersionIncrement) {
  const splitted = version.split('.');

  if (type === 'patch') {
    splitted[2] = (Number(splitted[2]) + 1).toString();
  }

  if (type === 'minor') {
    splitted[1] = (Number(splitted[1]) + 1).toString();
    splitted[2] = '0';
  }

  if (type === 'major') {
    splitted[0] = (Number(splitted[0]) + 1).toString();
    splitted[1] = '0';
    splitted[2] = '0';
  }

  return splitted.join('.');
}

function getUpdatedStage(version: string, type: VersionStage) {
  const [name, stage] = (version || '').split('.');

  if (!version || name !== type) {
    return `${type}.0`;
  }

  return `${name}.${Number(stage) + 1}`;
}

const VERSION_INCREMENT: VersionIncrement[] = ['patch', 'minor', 'major'];
const VERSION_STAGE: VersionStage[] = ['alpha', 'beta', 'rc'];

export interface GetNextVersionOptions {
  type: VersionIncrement;
  stage?: VersionStage;
}

export function getNextVersion(
  version: string,
  options: GetNextVersionOptions = { type: 'patch' }
) {
  if (!VERSION_INCREMENT.includes(options.type)) {
    throw new Error(
      `Incorrect version type: "${
        options.type
      }", it should be one of the following values: ${VERSION_INCREMENT.join(', ')}`
    );
  }

  if (options.stage && !VERSION_STAGE.includes(options.stage)) {
    throw new Error(
      `Incorrect version stage: "${
        options.stage
      }", it should be one of the following values: ${VERSION_STAGE.join(', ')}`
    );
  }

  try {
    const [rawVersion, rawStage] = version.split('-');

    if (!rawStage && options.stage) {
      return `${getUpdatedVersion(rawVersion, options.type)}-${getUpdatedStage(
        rawStage,
        options.stage
      )}`;
    }

    if (rawStage && !options.stage) {
      return rawVersion;
    }

    if (!rawStage && !options.stage) {
      return getUpdatedVersion(rawVersion, options.type);
    }

    return `${rawVersion}-${getUpdatedStage(rawStage, options.stage)}`;
  } catch (e) {
    throw new Error(`Failed to parse version: "${version}"`);
  }
}
