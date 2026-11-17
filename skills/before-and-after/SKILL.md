---
name: before-and-after
description: Lay out before-and-after screenshots and videos in a pull request description. Use when adding screenshots or screen recordings to a PR.
---

# Before and after

Show each comparison side by side, before on the left and after on the right.

## Capture matching pairs

- "After" is the current branch. "Before" is production, the base branch, or the last deploy. Never revert, stash, or switch branches to fake a "before".
- Capture both sides at the same viewport, page state, and crop. For a component or section, capture the same region on both sides.
- Make full-page screenshots the same pixel height. GitHub centers a shorter image vertically in its table cell, so the tops would not line up. Before you capture, add space to the bottom of the shorter page until both pages have the same `document.documentElement.scrollHeight`. Never add space above the page.
- Pair an image with an image and a video with a video.

## Lay out screenshots

Use one Markdown table per pair. When the PR has more than one pair, label each one, for example with the viewport:

```markdown
| Before (Mobile) | After (Mobile) |
|:---:|:---:|
| ![Before](./captures/mobile-before.png) | ![After](./captures/mobile-after.png) |
```

A new page or component has no "before". Show it alone as a preview:

```markdown
| Preview (Settings page) |
|:---:|
| ![Preview](./captures/settings.png) |
```

## Lay out videos

A Markdown table cannot hold a video player, so use an HTML table. It needs the uploaded `https://github.com/user-attachments/assets/...` URLs, so upload the videos first:

```html
<table>
  <tr>
    <th>Before (Mobile)</th>
    <th>After (Mobile)</th>
  </tr>
  <tr>
    <td><video src="https://github.com/user-attachments/assets/BEFORE_ID" width="100%" controls></video></td>
    <td><video src="https://github.com/user-attachments/assets/AFTER_ID" width="100%" controls></video></td>
  </tr>
</table>
```

For a video with no "before", put its URL on its own line under a bold `**Preview**` label. GitHub renders a URL alone on its line as a player.

## Place and publish

Put the media after the opening paragraph and before any Details section. Put the evidence that proves the PR first, and label supplementary demos as demos. Wrap the media in `<!-- before-and-after:start -->` and `<!-- before-and-after:end -->`, so a later update replaces only that block.

Upload the media to the PR, for example with `gh pr edit --attach`. Never commit it to the branch. If you cannot upload it, say in the description which media is missing and why.

The step is done when the rendered PR shows every image and every video plays.
