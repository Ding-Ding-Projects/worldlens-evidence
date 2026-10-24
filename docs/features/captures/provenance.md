# Provenance, privacy review, and limits

Each gallery entry preserves its original image bytes and reports a matching SHA-256 value. The six existing entries retain their previously reviewed provenance. Nine additional native baseline captures are bound to source revision `00290f2fb45f1b9bc9748b2db973d68aaa1a50c` by the private build and image-hash receipts. A sanitized public provenance record is available at `docs/manifests/native-baseline-00290f2.json`; local receipt paths are omitted. The source revision is not currently resolvable through the public Worldlens repository.

The new native frames show the first-run setup, home workspace, empty map workspace, empty server list, and settings. The first-run receipt records a completed setup flow after declining the download-consent choice. The home, map, server, and settings screens are baseline observations only. No loaded terrain, map selection, server setup, new-feature completion, or current-release behavior is proven.

The 1280 by 800 images are native window captures at 96 DPI. The 800 by 600 images are renderer emulation, not a native window or a display-scale measurement. The configuration frame is excluded: a shortcuts overlay obscures substantial content and prevents clear inspection.

All nine included source images were inspected as original pixels and their bytes were copied unchanged. Visible frames contain no local paths, credentials, private wording, user records, or private announcement images. PNG metadata inspection found only an sRGB marker on some files; no text or EXIF fields were present. Capture timestamps are unavailable for the new images. Build times and file timestamps were not treated as capture-time evidence.

Source identifiers are provenance labels. The gallery does not claim that every corresponding source revision is publicly accessible. These images do not prove portable delivery, a complete language/theme/scale matrix, full accessibility, or complete product acceptance.
