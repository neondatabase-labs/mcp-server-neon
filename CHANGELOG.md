# Changelog

## UNRELEASED

- Fix default database name or role name assumptions.

## [0.3.4] - 2025-03-26

- Add `neon-auth`, `neon-serverless`, and `neon-drizzle` resources
- Fix initialization on Windows by implementing correct platform-specific paths for Claude configuration

## [0.3.3] - 2025-03-19

- Fix the API Host

## [0.3.2] - 2025-03-19

- Add User-Agent to api calls from mcp server

## [0.3.1] - 2025-03-19

- Add User-Agent to api calls from mcp server

## [0.3.0] - 2025-03-14

- Add `provision_neon_auth` tool

## [0.2.3] - 2025-03-06

- Adds `get_connection_string` tool
- Hints the LLM to call the `create_project` tool to create new databases

## [0.2.2] - 2025-02-26

- Fixed a bug in the `list_projects` tool when passing no params
- Added a `params` property to all the tools input schemas

## [0.2.1] - 2025-02-25

- Fixes a bug in the `list_projects` tool
- Update the `@modelcontextprotocol/sdk` to the latest version
- Use `zod` to validate tool input schemas

## [0.2.0] - 2025-02-24

- Add [Smithery](https://smithery.ai/server/neon) deployment config

## [0.1.9] - 2025-01-06

- Setups tests to the `prepare_database_migration` tool
- Updates the `prepare_database_migration` tool to be more deterministic
- Removes logging from the MCP server, following the [docs](https://modelcontextprotocol.io/docs/tools/debugging#implementing-logging)

## [0.1.8] - 2024-12-25

- Added `beforePublish` script so make sure the changelog is updated before publishing
- Makes the descriptions/prompts for the prepare_database_migration and complete_database_migration tools much better

## [0.1.7-beta.1] - 2024-12-19

- Added support for `prepare_database_migration` and `complete_database_migration` tools
