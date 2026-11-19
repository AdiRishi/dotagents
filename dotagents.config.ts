import { defineConfig } from "./cli/src/config.ts";

const tstack = "https://github.com/t3dotgg/tstack/tree/11e37a74d0a6868c121cd0910ab2b3bd9873b92a";
const pstack = "https://github.com/cursor/plugins/tree/bf0c7cd80abdbf7fe47b634978a7d1b4071f71a7/pstack";
const mattpocock = "https://github.com/mattpocock/skills/tree/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d";
const addedCodexMetadata = "Added agents/openai.yaml.";

export default defineConfig({
	harnesses: {
		"claude-code": {
			skills: "~/.claude/skills",
			instructions: "~/.claude/CLAUDE.md",
		},
		codex: {
			skills: "~/.codex/skills",
			instructions: "~/.codex/AGENTS.md",
			instructionsSection: "instructions/codex.md",
		},
		cursor: {
			skills: "~/.cursor/skills",
			instructions: "~/.cursor/AGENTS.md",
		},
	},
	defaultHarnesses: ["claude-code", "codex"],
	skills: {
		"agent-browser": {
			harnesses: ["claude-code", "codex", "cursor"],
			upstream:
				"https://github.com/vercel-labs/agent-browser/tree/53384771fbafc261ba67608ac806dd5aa70b84f0/skills/agent-browser",
			changes: addedCodexMetadata,
		},
		"babysit-pr": {
			harnesses: ["claude-code", "codex", "cursor"],
			upstream: `${tstack}/skills/babysit-pr`,
			changes: addedCodexMetadata,
		},
		"before-and-after": {
			harnesses: ["claude-code", "codex", "cursor"],
		},
		"cf-cli": {
			upstream:
				"https://github.com/cloudflare/skills/tree/e44f580f9c4fa3bf268e284ae7706c7954ba31fd/skills/cf-cli",
			changes: addedCodexMetadata,
		},
		"claude-code-review": {
			harnesses: ["claude-code"],
		},
		"codebase-design": {
			upstream: `${mattpocock}/skills/engineering/codebase-design`,
		},
		council: {
			upstream: `${tstack}/skills/council`,
			changes: `Uses Gemini 4 Neon instead of Gemini Pro as the third default model. Members the user names replace the default, regardless of count or provider. ${addedCodexMetadata}`,
		},
		"create-formal-verification-skill": {
			upstream: `${pstack}/skills/create-formal-verification-skill`,
			changes: addedCodexMetadata,
		},
		"create-verification-skill": {
			upstream: `${pstack}/skills/create-verification-skill`,
			changes: `Writes the generated verify skill to .agents/skills instead of .cursor/skills. ${addedCodexMetadata}`,
		},
		"engineering-principles": {
			upstream: `${pstack}/skills`,
			changes:
				"Combines pstack's principle-* skills and benchmark-checklist into one skill. Each references/<name>.md is a copy of pstack/skills/<name>/SKILL.md. Links to other principles point to their reference files, and mentions of pstack skills and playbooks that this repository does not have are removed. SKILL.md, the index that says when each principle applies, and agents/openai.yaml are written here.",
		},
		"file-pr": {
			harnesses: ["claude-code", "codex", "cursor"],
			upstream: `${tstack}/skills/file-pr`,
			changes: `Moved the guidance and examples for the PR description opening to pr-writing, and refers to that skill instead. ${addedCodexMetadata}`,
		},
		"frontend-design": {
			upstream:
				"https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/frontend-design",
			changes: addedCodexMetadata,
		},
		"full-send": {
			upstream: `${tstack}/skills/full-send`,
		},
		"full-stop": {
			upstream: `${tstack}/skills/full-stop`,
		},
		"game-development": {
			harnesses: ["codex"],
		},
		grilling: {
			upstream: `${mattpocock}/skills/productivity/grilling`,
		},
		improve: {
			upstream:
				"https://github.com/shadcn/improve/tree/cac56e1ebd3c279aa9153616cfeac7b174ab90f9/skills/improve",
			changes: `Added disable-model-invocation so only the user can invoke the skill. ${addedCodexMetadata}`,
		},
		"leaving-pr-comments": {
			harnesses: ["claude-code", "codex", "cursor"],
			upstream: `${tstack}/skills/leaving-pr-comments`,
		},
		"maintain-formal-verification-skill": {
			upstream: `${pstack}/skills/maintain-formal-verification-skill`,
			changes: addedCodexMetadata,
		},
		"maintain-verification-skill": {
			upstream: `${pstack}/skills/maintain-verification-skill`,
			changes: `Looks for the verify skill in .agents/skills instead of .cursor/skills. ${addedCodexMetadata}`,
		},
		"orchestrate-claude": {
			harnesses: ["claude-code"],
		},
		"orchestrate-codex": {
			harnesses: ["codex"],
		},
		"pr-writing": {
			harnesses: ["claude-code", "codex", "cursor"],
			upstream:
				"https://github.com/HugoRCD/hr-folio/tree/f296fa2b7364a62b9e985f1c9d2f69be0654b857/skills/pr-writing",
			changes: `The description lists only when to invoke the skill. The body has three sections: file-pr's simple opening and examples, optional reviewer details with good and bad examples, and the upstream evidence table. Technical explanations go in the details section. Removed the upstream AI attribution, approval requirements, ELI5, and the final checklist. Replaced the browser-tool line with when a PR needs screenshots or video, pointing to the before-and-after skill, which carries the "Keep it honest" rules for media. Removed the rest of "Keep it honest". ${addedCodexMetadata}`,
		},
		"sol-loop": {
			upstream: `${tstack}/skills/sol-loop`,
			changes: addedCodexMetadata,
		},
		statechart: {
			upstream: `${pstack}/skills/statechart`,
			changes: addedCodexMetadata,
		},
		"technical-writing": {
			upstream: `${pstack}/skills/technical-writing`,
			changes: `Removed disable-model-invocation so the model can invoke the skill. ${addedCodexMetadata}`,
		},
		"typesafe-ai": {
			upstream:
				"https://github.com/typesafe-ai/skills/tree/302eea662c54bca6730873fe245bec1d69ebc23d/skills/typesafe-ai",
			changes: addedCodexMetadata,
		},
		"typescript-best-practices": {
			upstream: `${pstack}/skills/typescript-best-practices`,
			changes: `Removed disable-model-invocation so the model can invoke the skill. References to standalone pstack principle skills point to the reference files in engineering-principles instead. ${addedCodexMetadata}`,
		},
		unslop: {
			upstream: `${pstack}/skills/unslop`,
			changes: `Removed disable-model-invocation so the model can invoke the skill. The description keeps "Must always apply." so the model loads the skill for all writing. Upstream dropped that sentence in bc697d0. ${addedCodexMetadata}`,
		},
		"walk-me-through": {},
		wayfinder: {
			upstream: `${mattpocock}/skills/engineering/wayfinder`,
		},
		"writing-for-agents": {
			upstream: `${mattpocock}/skills/productivity/writing-for-agents`,
		},
	},
});
