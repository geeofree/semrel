import { path, fs, YAML, argv } from 'zx';
/**
  * @typedef ReleaseRule
  * @property {string} title Title of the release note for this change
  * @property {string[]} starts-with Prefixes for commits subjects to start with.
  * @property {string[]?} ends-with Prefixes for commits subjects to end with. Takes precedence over `starts-with` if provided.
/**
  * @typedef ReleaseRules
  * @property {ReleaseRule} major
  * @property {ReleaseRule} minor
  * @property {ReleaseRule} patch
  **/

/**
  * @callback onReleaseCallback
  * @param {object} data
  **/

/**
  * @typedef SemRelConfig
  * @property {string} initial-version Sets the initial version if no other versions have been released.
  * @property {boolean?} dry-run Runs the release script without pushing tags or publishing releases.
  * @property {boolean?} draft Publishes a draft release.
  * @property {boolean?} pre-release Publishes a pre-release.
  * @property {string?} jira-url The URL for the JIRA board
  * @property {boolean?} validate-jira-links If true, checks if the scopes of the commits are valid as JIRA ticket identifiers.
  * @property {string?} suffix Adds a suffix for the version name
  * @property {onReleaseCallback?} onRelease Adds a suffix for the version name
  * @property {ReleaseRules} release-rules
  **/

const getConfig = async () => {
  /** @type SemRelConfig */
  let config = {
    'initial-version': '1.0.0',
    'dry-run': false,
    'jira-url': null,
    'validate-jira-links': false,
    'draft': false,
    'pre-release': false,
    suffix: null,
    'release-rules': {
      major: {
        title: 'BREAKING CHANGES',
        'ends-with': ['!'],
      },
      minor: {
        title: 'New Features',
        'starts-with': ['feat', 'feature'],
      },
      patch: {
        title: 'Bug Fixes',
        'starts-with': ['fix', 'perf', 'hotfix'],
      }
    },
    onRelease: null,
  }

  let configFilePaths = ['.semrel.js', '.semrel.yaml', '.semrel.yml'].map(fileName => {
    const filePath = path.resolve(require.main.filename, '..', '..', fileName);
    return fs.pathExists(filePath).then(exists => exists ? filePath : null);
  });

  configFilePaths = await Promise.all(configFilePaths);

  const configFilePath = configFilePaths.find(filePath => filePath);

  if (configFilePath) {
    const fileExtension = await path.extname(configFilePath);

    let configFile;

    switch (fileExtension) {
      case ".yaml":
      case ".yml":
        configFile = await fs.readFile(configFilePath, 'utf-8');
        configFile = YAML.parse(configFile);
        break;

      case ".js":
        configFile = require(configFilePath);
        break;
    }

    config = {
      ...config,
      ...configFile,
      'release-rules': {
        ...config['release-rules'],
      }
    };

    if (configFile['release-rules']) {
      config = {
        ...config,
        'release-rules': {
          ...config['release-rules'],
          major: {
            ...config['release-rules'].major,
            ...configFile['release-rules'].major,
          },
          minor: {
            ...config['release-rules'].minor,
            ...configFile['release-rules'].minor,
          },
          patch: {
            ...config['release-rules'].patch,
            ...configFile['release-rules'].patch,
          },
        }
      }
    }
  } else {
    console.log('[INFO] No config file found.');
  }

  const validArgs = [
    'suffix', 's',
    'initial-version', 'i',
    'jira-url', 'ju',
    'dry-run', 'd',
    'validate-jira-links',
    'draft',
    'pre-release',
  ];

  const argAliases = {
    s: 'suffix',
    i: 'initial-version',
    ju: 'jira-url',
    d: 'dry-run',
  }

  const args = Object.keys(argv).filter(arg => validArgs.includes(arg)).reduce((acc, arg) => {
    let value = argv[arg];

    if (argAliases[arg]) {
      acc[argAliases[arg]] = value;
    } else {
      acc[arg] = value;
    }

    return acc;
  }, {});

  config = {
    ...config,
    ...args,
    'release-rules': {
      ...config['release-rules']
    }
  };

  return config;
};

export default getConfig;
