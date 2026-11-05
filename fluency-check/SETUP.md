# Multiplication Fluency Check — class version (Firebase)

Three things ship together:

| File | What it is |
| --- | --- |
| `index.html` | The student page. Works **free** on its own, or in **class mode** when opened with `?class=CODE`. |
| `teacher.html` | The teacher dashboard — Google sign-in, create a class, see class results. |
| `firebase-config.js` | Your Firebase web keys (shared by both pages). |
| `firestore.rules` | Security rules — paste these into Firestore. |

Students join with **initials only (max 3 letters)**. No child names or emails are stored. Only the signed-in teacher who owns a class can read its results.

## One-time setup

1. **Firebase project** — use your existing one (or create a project at console.firebase.google.com).
2. **Add a Web app** (Project settings → General → Your apps → Web). Copy the config values into **`firebase-config.js`**.
3. **Enable Google sign-in** — Authentication → Sign-in method → enable **Google**. Under Authentication → Settings → Authorized domains, add the domain you'll host on (e.g. `numberhive.github.io` or `check.numberhive.app`).
4. **Create Firestore** — Firestore Database → Create (production mode). Then open the **Rules** tab, paste the contents of `firestore.rules`, and Publish.
5. **Host the files** together in one folder (GitHub Pages or Firebase Hosting both fine). `index.html` is the student entry point; `teacher.html` is the dashboard.

## How it runs

- **Teacher:** open `teacher.html` → sign in → "Create a class" (e.g. *Year 5 Blue*) → share the join code / link.
- **Student:** open the share link (`.../index.html?class=ABCDE`) → enter initials → take the check. Their result auto-submits to the class and they still see their own profile.
- **Teacher:** click the class to see the class average, a per-strand bar summary, a colour-coded student table (initials × strands), and a CSV download.

## Data model (Firestore)

```
classes/{CODE}                { name, teacherUid, createdAt }
classes/{CODE}/results/{id}   { initials, overall, recall, models, strategies, flex, choice, focus, median_s, submittedAt }
```

The class doc holds no personal data (name + teacher uid only), so a student can validate a code without seeing anything sensitive. Results are readable only by the owning teacher.

## Notes

- The free, no-code version is unchanged — opening `index.html` with no `?class=` runs exactly as the standalone screener, nothing is stored.
- GA4 events (`assessment_start`, `assessment_complete`, `remediation_click`, `cta_click`) fire in both modes; `mode` is `free` or `class`.
- For a dedicated domain, swap `NH_GA_ID` at the top of `index.html` for a separate GA property if you want its traffic reported separately.
- Retention: decide how long to keep results. For a quick clean-up you can delete a class (and its results) from the Firestore console; a "delete class" button can be added to the dashboard later.
