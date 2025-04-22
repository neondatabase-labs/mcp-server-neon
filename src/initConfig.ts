import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'),
);
// Determine Claude config path based on OS platform
let claudeConfigPath: string;
const platform = os.platform();

if (platform === 'win32') {
  // Windows path - using %APPDATA%
  // For Node.js, we access %APPDATA% via process.env.APPDATA
  claudeConfigPath = path.join(
    process.env.APPDATA || '',
    'Claude',
    'claude_desktop_config.json',
  );
} else {
  // macOS and Linux path (according to official docs)
  claudeConfigPath = path.join(
    os.homedir(),
    'Library',
    'Application Support',
    'Claude',
    'claude_desktop_config.json',
  );
}

const MCP_NEON_SERVER = 'neon';

export const parseArgs = () => {
  const args = process.argv;
  if (args.length === 0) {
    console.error(
      'Please provide a NEON_API_KEY as a command-line argument - you can get one through the Neon console: https://neon.tech/docs/manage/api-keys',
    );
    process.exit(1);
  }

  if (args.length !== 4) {
    console.error('Invalid number of arguments');
    process.exit(1);
  }

  return {
    executablePath: args[1],
    command: args[2],
    neonApiKey: args[3],
  };
};

export function handleInit({
  executablePath,
  neonApiKey,
}: {
  executablePath: string;
  neonApiKey: string;
}) {
  // If the executable path is a local path to the dist/index.js file, use it directly
  // Otherwise, use the name of the package to always load the latest version from remote
  const serverPath = executablePath.includes('dist/index.js')
    ? executablePath
    : packageJson.name;

  const neonConfig = {
    command: 'npx',
    args: ['-y', serverPath, 'start', neonApiKey],
  };

  const configDir = path.dirname(claudeConfigPath);
  if (!fs.existsSync(configDir)) {
    console.log(chalk.blue('Creating Claude config directory...'));
    fs.mkdirSync(configDir, { recursive: true });
  }

  const existingConfig = fs.existsSync(claudeConfigPath)
    ? JSON.parse(fs.readFileSync(claudeConfigPath, 'utf8'))
    : { mcpServers: {} };

  if (MCP_NEON_SERVER in (existingConfig?.mcpServers || {})) {
    console.log(chalk.yellow('Replacing existing Neon MCP config...'));
  }

  const newConfig = {
    ...existingConfig,
    mcpServers: {
      ...existingConfig.mcpServers,
      [MCP_NEON_SERVER]: neonConfig,
    },
  };

  fs.writeFileSync(claudeConfigPath, JSON.stringify(newConfig, null, 2));
  console.log(chalk.green(`Config written to: ${claudeConfigPath}`));
  console.log(
    chalk.blue(
      'The Neon MCP server will start automatically the next time you open Claude.',
    ),
  );
}
