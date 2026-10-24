# Continuation record

## Current result

The public gallery is available at https://ding-ding-projects.github.io/worldlens-evidence/. GitHub Pages uses `main` at `/docs`. The repository homepage field reads back as that exact URL. The latest published main revision is `a547cfcbc865c9fb088e66c6c33d0ddcd50d85a0`, verified by `git ls-remote`. GitHub Pages reports a built deployment for that revision.

The gallery contains fifteen reviewed original images. Nine supplied native Worldlens baseline images were added byte-for-byte. The configuration frame was excluded because a shortcuts overlay obscures its content. The broader local-run image inventory and private announcement images remain excluded. All fifteen live image responses returned successfully and their hashes matched the public inventory.

The exact root `build.bat` passed: `PASS: 15 reviewed image hashes and 15 gallery records verified.` The publication-language scan passed with no findings. The baseline record contains sanitized source and build provenance but omits local paths and private receipt contents. The public Worldlens API did not resolve source revision `00290f2fb45f1b9bc9748b2db973d68aaa1a50c`; the gallery makes no claim about source availability or current-release behavior.

Desktop checks at 1440 by 1000 and emulated mobile checks at 390 by 844 passed for the live gallery. Baseline filtering, plain search, regular-expression search, keyboard image-dialog opening and closing, visible focus, accessibility names, and overflow checks passed. There was no horizontal overflow, console error, exception, third-party request, or failed resource. The provenance article returned HTTP 200. Capture timestamps remain unavailable. The 1280 by 800 app images are native window captures at 96 DPI; the 800 by 600 app images are renderer emulation. The map screenshots show no loaded map and the server screenshot shows an empty server list.

## Remaining limits and next steps

The full version-1 runtime receipt is incomplete because cleanup of the isolated browser profile did not finish. The browser process tree and CDP port are gone and the hidden desktop list is empty. The source Worldlens README backlink remains owned by the parent source task and is pending.

Gallery publication and GitHub Pages deployment are independently verified. They do not establish that the named source revision is publicly available, that current-release behavior is represented, or that full product acceptance is complete. The source task must add and read back its README backlink to the URL above.
