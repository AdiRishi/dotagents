<p align="center">
  <img src="docs/assets/icon.svg" width="96" alt="">
</p>

# dotagents

This repository is my setup for coding agents. It holds the global instructions my agents follow, the skills they load, and a small TypeScript CLI that installs both across my machines. Claude Code, Codex, Cursor, and Antigravity all pull from here.

## Global instructions

Every agent loads [`instructions/base.md`](./instructions/base.md) as its global instructions. Here are the main rules:

- Start with the simplest design that fits the real requirements. Finish the requested work without leaving half-built paths for things that might come later.
- Trust internal types and framework guarantees. Validate at system boundaries, such as user input and external APIs.
- Delete dead code instead of keeping it around with renamed `_variables`, compatibility shims, or `removed` comments.
- Test outcomes a caller cares about so tests survive internal refactors. Skip mock call counts and expected values calculated with the implementation's own logic.
- Write comments only for what the code cannot show, such as a hidden constraint or a workaround.
- Run anything I will read through [`unslop`](skills/unslop) first.
- Use [`agent-browser`](skills/agent-browser) for browser tasks. The one exception is connecting to my running Chrome, where Claude Code and Codex use their own Chrome extensions.
- Commit at reviewable checkpoints, and push related commits together because pushes to an open PR can trigger paid reviews.

Codex also loads [`instructions/codex.md`](./instructions/codex.md), which covers working inside its sandbox.

## Skills

Skills marked "Mine" were written for this repository. The rest come from other repositories, and "edited" means I changed more than adding the `agents/openai.yaml` metadata file that Codex needs. See [`dotagents.config.ts`](./dotagents.config.ts) for every upstream link and a note on what I changed.

### Plan and design

| Skill | What it does | From |
| --- | --- | --- |
| [grilling](skills/grilling) | Questions me about a plan or decision until every open detail is settled. | Matt Pocock |
| [wayfinder](skills/wayfinder) | Breaks work that is too large for one session into decision tickets on an issue tracker, then works through them one at a time. | Matt Pocock |
| [codebase-design](skills/codebase-design) | Gives agents a shared vocabulary for designing deep modules and deciding where module boundaries belong. | Matt Pocock |
| [improve](skills/improve) | Audits a codebase and writes self-contained implementation plans for a cheaper agent to execute. It never edits code itself. | shadcn, edited |
| [engineering-principles](skills/engineering-principles) | Indexes 24 engineering principles, such as "fix root causes" and "subtract before you add", and loads each one only when it applies. | Mine, with pstack's principles |

### Build

| Skill | What it does | From |
| --- | --- | --- |
| [typescript-best-practices](skills/typescript-best-practices) | Applies TypeScript rules whenever an agent reads or edits a `.ts` file: discriminated unions, branded types, and no `as` casts. | pstack, edited |
| [frontend-design](skills/frontend-design) | Guides visual direction and typography for new UI so it does not look like a default template. | Anthropic |
| [game-development](skills/game-development) | Builds games from an experience brief and art direction through playable slices, where I judge how the game feels. Codex only. | Mine |
| [typesafe-ai](skills/typesafe-ai) | Replaces prompt-and-parse steps with TypeSafe's typed AI judgments. | TypeSafe AI |
| [cf-cli](skills/cf-cli) | Runs Cloudflare's `cf` CLI for DNS, Workers, D1, KV, and R2. | Cloudflare |

### Coordinate agents

| Skill | What it does | From |
| --- | --- | --- |
| [orchestrate-claude](skills/orchestrate-claude) | Coordinates Claude subagents with clear ownership, an explicit model, and an effort level for each task. Claude Code only. | Mine |
| [orchestrate-codex](skills/orchestrate-codex) | Coordinates Codex subagents with clear ownership on the current thread's model. Codex only. | Mine |

### Verify

| Skill | What it does | From |
| --- | --- | --- |
| [agent-browser](skills/agent-browser) | Drives a browser from the command line to test web apps and interact with pages. Every agent uses it for browser work. | Vercel |
| [create-verification-skill](skills/create-verification-skill) | Generates a project skill that tests an app the way a user does. | pstack, edited |
| [maintain-verification-skill](skills/maintain-verification-skill) | Keeps a project's verification skill and feature map up to date as the app changes. | pstack, edited |
| [create-formal-verification-skill](skills/create-formal-verification-skill) | Generates a project skill for formally verifying high-stakes code that ordinary tests do not cover well. | pstack |
| [maintain-formal-verification-skill](skills/maintain-formal-verification-skill) | Updates a project's formal verification models after the verified code changes. | pstack |
| [statechart](skills/statechart) | Checks a TLA+ model and renders it as a Mermaid statechart with the shortest path to each state that breaks an invariant. | pstack |

### Review and ship

| Skill | What it does | From |
| --- | --- | --- |
| [claude-code-review](skills/claude-code-review) | Runs Claude Code's review, checks each finding against the code and my intent, and fixes the ones that hold up. Claude Code only. | Mine |
| [council](skills/council) | Runs multi-model reviews with Claude Opus, GPT Sol, and Gemini 4 Neon by default, or any models I name. It scores each round and repeats until they sign off. | Theo Browne, edited |
| [file-pr](skills/file-pr) | Opens a concise pull request. | Theo Browne, edited |
| [before-and-after](skills/before-and-after) | Lays out before-and-after screenshots and videos side by side in a PR description. | Mine, with layouts from Vercel Labs |
| [pr-writing](skills/pr-writing) | Structures a PR description with a short summary, optional reviewer details, and evidence. | HugoRCD, edited |
| [babysit-pr](skills/babysit-pr) | Watches a pull request through review and CI. | Theo Browne |
| [sol-loop](skills/sol-loop) | Runs up to three rounds of GPT Sol review by default and makes the smallest fix for each finding that holds up. | Theo Browne |
| [full-send](skills/full-send) | Ships a change to merge while I am away. It proves the change, runs sol-loop, opens and babysits the PR, and merges once checks and reviews pass. | Theo Browne |
| [full-stop](skills/full-stop) | Follows the same workflow as full-send, but leaves the PR open for me to merge. | Theo Browne |
| [leaving-pr-comments](skills/leaving-pr-comments) | Adds an attribution callout to agent-authored GitHub comments and keeps replies direct and concise. | Theo Browne |

### Write and explain

| Skill | What it does | From |
| --- | --- | --- |
| [unslop](skills/unslop) | Cuts AI writing patterns. Every agent loads it before writing anything I will read. | pstack, edited |
| [technical-writing](skills/technical-writing) | Applies a technical writing standard built on Diátaxis, Google developer style, Simplified Technical English, and Global English. | pstack, edited |
| [writing-for-agents](skills/writing-for-agents) | Shows how to write skills and `AGENTS.md` files that agents follow reliably across runs. | Matt Pocock |
| [walk-me-through](skills/walk-me-through) | Explains an implementation, diff, or design in the order that makes it easiest to understand, rather than file order. | Mine |

## How it works

```text
instructions/        shared global instructions, plus agent-specific sections
skills/              one folder per skill
cli/src/             CLI that checks the repository and installs it on a machine
cli/test/            one test file per CLI module
docs/assets/         repository icon
dotagents.config.ts  configured agents, skill install targets, and upstream sources
```

[`dotagents.config.ts`](./dotagents.config.ts) defines each supported agent under `harnesses` and lists where each skill installs. The config is typed, so a typo in an agent name fails `pnpm typecheck`.

`node cli/src/cli.ts apply` copies each skill into every target agent's skills directory. It also builds each agent's global instruction file from `instructions/base.md` and any agent-specific section. Every installed skill gets a `.dotagents` marker file. Future runs use that marker to remove skills dropped from the config without touching skills installed from elsewhere.

I do not use merge tooling to keep copied skills in sync. Some local edits, such as my restructure of `pr-writing`, are too large for a three-way merge, so an agent updates them instead. Ask an agent in this repository to update the skills, and the project's [`update-skills`](./.agents/skills/update-skills/SKILL.md) skill takes it from there.

CI runs `pnpm check`, `pnpm typecheck`, and `pnpm test`. The repo check verifies that every skill folder has a config entry, every relative link resolves, and every skill appears in this README. It also checks that `SKILL.md` and `agents/openai.yaml` agree on whether the model can invoke a skill automatically.

## Use it

If you want a single skill, copy its folder into your agent's skills directory, such as `~/.claude/skills/unslop`, or install it with the [`skills`](https://github.com/vercel-labs/skills) CLI:

```bash
npx skills add AdiRishi/dotagents --skill unslop
```

To sync the full setup onto a machine, install Node 26 or later and run:

```bash
git clone https://github.com/AdiRishi/dotagents
cd dotagents
node cli/src/cli.ts apply
```

Run `node cli/src/cli.ts check --machine` at any time to see whether a machine matches the repository. To limit a machine to specific agents, list them in `~/.config/dotagents/machine.json`:

```json
{ "harnesses": ["claude-code", "codex"] }
```

## Credits

This repository includes skills from:

- [Anthropic](https://github.com/anthropics/skills)
- [Cloudflare](https://github.com/cloudflare/skills)
- [HugoRCD](https://github.com/HugoRCD/hr-folio)
- [Lauren Tan](https://github.com/cursor/plugins/tree/main/pstack), through pstack
- [Matt Pocock](https://github.com/mattpocock/skills)
- [shadcn](https://github.com/shadcn/improve)
- [Theo Browne](https://github.com/t3dotgg/tstack), through tstack
- [TypeSafe AI](https://github.com/typesafe-ai/skills)
- [Vercel](https://github.com/vercel-labs/agent-browser)

Thanks to all of them. My own skills and code use the [MIT license](./LICENSE).
