import { getNextVersion } from './get-next-version';

describe('getNextVersion', () => {
  it('returns correct next patch version', () => {
    expect(getNextVersion('1.0.0', { type: 'patch' })).toBe('1.0.1');
    expect(getNextVersion('1.0.1', { type: 'patch' })).toBe('1.0.2');
    expect(getNextVersion('1.1.1', { type: 'patch' })).toBe('1.1.2');
    expect(getNextVersion('2.1.0', { type: 'patch' })).toBe('2.1.1');
  });

  it('returns correct next minor version', () => {
    expect(getNextVersion('1.0.0', { type: 'minor' })).toBe('1.1.0');
    expect(getNextVersion('1.0.1', { type: 'minor' })).toBe('1.1.0');
    expect(getNextVersion('1.1.0', { type: 'minor' })).toBe('1.2.0');
    expect(getNextVersion('1.1.1', { type: 'minor' })).toBe('1.2.0');
  });

  it('returns correct next major version', () => {
    expect(getNextVersion('1.0.0', { type: 'major' })).toBe('2.0.0');
    expect(getNextVersion('1.0.1', { type: 'major' })).toBe('2.0.0');
    expect(getNextVersion('2.0.0', { type: 'major' })).toBe('3.0.0');
    expect(getNextVersion('2.0.1', { type: 'major' })).toBe('3.0.0');
    expect(getNextVersion('0.10.1', { type: 'major' })).toBe('1.0.0');
  });

  it('returns correct next stage version: patch', () => {
    expect(getNextVersion('1.1.2', { type: 'patch', stage: 'alpha' })).toBe('1.1.3-alpha.0');
    expect(getNextVersion('1.1.2', { type: 'patch', stage: 'beta' })).toBe('1.1.3-beta.0');
    expect(getNextVersion('1.1.3-alpha.0', { type: 'patch', stage: 'alpha' })).toBe(
      '1.1.3-alpha.1'
    );
    expect(getNextVersion('1.1.3-alpha.1', { type: 'patch', stage: 'alpha' })).toBe(
      '1.1.3-alpha.2'
    );
    expect(getNextVersion('1.1.3-alpha.0', { type: 'patch', stage: 'beta' })).toBe('1.1.3-beta.0');
    expect(getNextVersion('1.1.3-alpha.3', { type: 'patch', stage: 'rc' })).toBe('1.1.3-rc.0');
  });

  it('returns correct next stage version: minor', () => {
    expect(getNextVersion('1.1.2', { type: 'minor', stage: 'alpha' })).toBe('1.2.0-alpha.0');
    expect(getNextVersion('1.1.2', { type: 'minor', stage: 'beta' })).toBe('1.2.0-beta.0');
    expect(getNextVersion('1.2.0-alpha.0', { type: 'minor', stage: 'alpha' })).toBe(
      '1.2.0-alpha.1'
    );
    expect(getNextVersion('1.2.0-alpha.1', { type: 'minor', stage: 'alpha' })).toBe(
      '1.2.0-alpha.2'
    );
    expect(getNextVersion('1.2.0-alpha.0', { type: 'minor', stage: 'beta' })).toBe('1.2.0-beta.0');
    expect(getNextVersion('1.2.0-alpha.3', { type: 'minor', stage: 'rc' })).toBe('1.2.0-rc.0');
  });

  it('returns correct next stage version: major', () => {
    expect(getNextVersion('1.1.2', { type: 'major', stage: 'alpha' })).toBe('2.0.0-alpha.0');
    expect(getNextVersion('1.1.2', { type: 'major', stage: 'beta' })).toBe('2.0.0-beta.0');
    expect(getNextVersion('2.0.0-alpha.0', { type: 'major', stage: 'alpha' })).toBe(
      '2.0.0-alpha.1'
    );
    expect(getNextVersion('2.0.0-alpha.1', { type: 'major', stage: 'alpha' })).toBe(
      '2.0.0-alpha.2'
    );
    expect(getNextVersion('2.0.0-alpha.0', { type: 'major', stage: 'beta' })).toBe('2.0.0-beta.0');
    expect(getNextVersion('2.0.0-alpha.3', { type: 'major', stage: 'rc' })).toBe('2.0.0-rc.0');
  });

  it('performs correct stage -> regular version transition', () => {
    expect(getNextVersion('1.1.2-alpha.0', { type: 'patch' })).toBe('1.1.2');
    expect(getNextVersion('1.2.0-alpha.0', { type: 'minor' })).toBe('1.2.0');
    expect(getNextVersion('1.2.0-alpha.0')).toBe('1.2.0');
    expect(getNextVersion('2.0.0-alpha.0', { type: 'major' })).toBe('2.0.0');
  });
});
