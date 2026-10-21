# Provenance, privacy review, and limits

Each gallery entry preserves its original image bytes and reports the matching SHA-256 value. Five native captures use the source manifest `native-companions-2e9162c8.json` and source identifier `2e9162c87575a35fe6dd7c17282b39c1a26485aa`. The remaining browser capture uses its own manifest and source identifier `fd74262d62d99990f999865543f105369b4875a0`.

The native manifest records window dimensions, DPI, language, theme, image hashes, and main-bundle hashes. It explicitly marks capture timestamps unavailable, display-scale mapping unverified, the language/theme/scale matrix incomplete, and portable delivery and full feature acceptance pending. The browser manifest records its viewport, theme, language, image hash, and built-file hashes; it marks display scale unverified and native interaction and audio unverified.

The image pixels were inspected independently. The five native images contain no credentials, private wording, machine paths, or user records according to their source review. The browser image contains no imported private wording, credentials, or user records according to its source review. All six files were inspected again before inclusion, and their hashes match the source manifests.

Capture timestamps are unavailable. Build time visible within the build companion image is product UI content, not the capture time. Source identifiers are provenance labels; this gallery does not claim that the corresponding source revisions are accessible in the public Worldlens Oak Kay.
