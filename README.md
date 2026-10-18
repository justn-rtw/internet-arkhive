# Internet Arkhive

Poetry site for internetarkhive.com. Built with Eleventy, hosted free on GitHub Pages.

## Add a new poem (about 1 minute, no coding)

1. On GitHub, open the `src/poems` folder and click **Add file → Create new file**.
2. Name it with dashes, e.g. `late-train.md`. The file name becomes the URL: `internetarkhive.com/poems/late-train/`.
3. Paste this, then your poem:

```
---
title: Late Train
date: 2026-10-20
---
First line of the poem
second line

New stanza after a blank line
```

4. Click **Commit changes**. The site rebuilds itself in about a minute.

Rules: every line break you type is kept. A blank line starts a new stanza. Use `*word*` for italics. The `date` controls the order on the home page (newest first) and the date shown.

To edit or remove a poem, open its file and use the pencil (edit) or trash icon.

## Before launch: replace the placeholders

| What | Where |
|---|---|
| Tagline | `src/_data/site.json` → `tagline` |

## One-time setup

### 1. Put the code on GitHub
1. Create a free account at github.com, then click **New repository**. Name it `internet-arkhive`, set it to Public, create it.
2. Click **uploading an existing file**, drag in everything from this folder (including the hidden `.github` folder), and commit.
   - On a Mac, press `Cmd + Shift + .` in Finder to show hidden folders.

### 2. Turn on GitHub Pages
1. Repo → **Settings → Pages**.
2. Under **Source**, pick **GitHub Actions**.
3. Go to the **Actions** tab and confirm "Publish site" ran green.
4. Back in **Settings → Pages**, enter `internetarkhive.com` as the custom domain and save. Tick **Enforce HTTPS** once it's available (can take up to a day).

### 3. Point your domain at GitHub
At your domain registrar's DNS settings, add:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR-GITHUB-USERNAME.github.io |

Delete any existing A records for `@` (parking pages). DNS can take a few hours.

### 4. Set up the newsletter (Buttondown)
1. Sign up at buttondown.com. Your username is in your newsletter's URL.
2. Put that username in `src/_data/site.json`.
3. When you post a poem, send subscribers an email from Buttondown. To make it automatic, use Buttondown's RSS-to-email feature with this feed: `https://internetarkhive.com/feed.xml` (check their pricing page; automations may need a paid plan).

The form works with any provider that accepts a plain form post. To switch, change the `action` URL in `src/_includes/subscribe.njk`.

## Run it on your own computer (optional)
Install Node.js 22, then in this folder:
```
npm install
npm start
```
Open http://localhost:8080.
