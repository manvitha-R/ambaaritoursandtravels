// The database has more active packages than actually appear on /Packages —
// some are legacy/unlisted (created in the admin dashboard but never added
// to the hand-maintained listing in PackagesContent.jsx). Search should only
// ever surface a package the customer can actually click through to from the
// Packages page, so results are filtered down to this allowlist.
//
// Keep this in sync with the (non-commented-out) `slug` values in
// app/Packages/PackagesContent.jsx.
export const PUBLISHED_PACKAGE_SLUGS = [
  "thailand-4n-5d",
  "vietnam-grand-tour-6n-7d",
  "malaysia-kuala-lumpur-2n-3d-24",
  "malaysia-singapore-combo-5n-6d-26",
  "dubai-5n-6d",
  "panchabhoota-yatra-3n-4d-srikalahasti-kanchipuram-thiruvannamalai-chidambaram-trichy-27",
  "do-dham-yatra-7n-8d-kedarnath-badrinath-28",
  "char-dham-yatra-with-chopta-tunganath-14n-15d-yamunotri-gangotri-kedarnath-badrinath-29",
  "kashi-yatra-8n-9d-lucknow-ayodhya-naimisharanya-prayagraj-chitrakoot-varanasi-gaya-baidyanath-30",
  "muktinath-yatra-with-ayodhya-darshan-9n-10d-ayodhya-lumbini-pokhara-muktinath-kathmandu-janakpur-31",
  "shirdi-sai-baba-yatra-1n-2d",
  "ujjain-omkareshwar-darshan-3n-4d",
  "puri-jagannath-darshan-3n-4d",
];
