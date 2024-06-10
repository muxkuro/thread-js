import { type SyncRule, type UserConfig } from '@commitlint/types';

import { ProjectPrefix } from './project.config.js';

const COMMIT_MODIFIERS = ['+', '*', '-'];
const COMMIT_MESSAGE_REGEXP = new RegExp(
  `^(((${ProjectPrefix.APP})-[0-9]{1,6})|(${ProjectPrefix.ENVIRONMENTS.join(
    '|'
  )})): ([${COMMIT_MODIFIERS.join(',')}]) (.*\\S)$`
);
const COMMIT_MESSAGE_MATCH_RULE_MESSAGE = `commit message doesn't match format requirements
Commit message must have one of the following formats:
  - <project-prefix>-<issue-number>: <modifier> <description>
  - <environment>: <modifier> <description>
Where:
  - <project-prefix>: ${ProjectPrefix.APP}
  - <modifier>: ${COMMIT_MODIFIERS.join(', ')}
  - <environment>: ${ProjectPrefix.ENVIRONMENTS.join(', ')}
Examples:
  - ${ProjectPrefix.APP}-5: + ui/ux lecture
  - ${ProjectPrefix.APP}-12: * docker homework
  - production: - comments in ui/ux homework`;

const configuration: UserConfig = {
  defaultIgnores: true,
  parserPreset: {
    parserOpts: {
      headerCorrespondence: ['prefix', 'modifier', 'description'],
      headerPattern: COMMIT_MESSAGE_REGEXP
    }
  },
  plugins: [
    {
      rules: {
        'commit-message-match': (({ header }) => {
          if (!COMMIT_MESSAGE_REGEXP.test(header as string)) {
            return [false, COMMIT_MESSAGE_MATCH_RULE_MESSAGE];
          }

          return [true];
        }) as SyncRule
      }
    }
  ],
  rules: {
    'commit-message-match': [2, 'always']
  }
};

export default configuration;
