import markdownIt from "markdown-it";

export default function (eleventyConfig) {
  // Keep every line break you type in a poem file.
  eleventyConfig.setLibrary("md", markdownIt({ html: true, breaks: true, typographer: true }));

  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "src/apple-touch-icon.png": "apple-touch-icon.png" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  // All poems, newest first.
  eleventyConfig.addCollection("poems", (api) =>
    api.getFilteredByGlob("src/poems/*.md").sort((a, b) => b.date - a.date)
  );

  // Poems grouped by year, newest year first.
  eleventyConfig.addCollection("poemsByYear", (api) => {
    const poems = api.getFilteredByGlob("src/poems/*.md").sort((a, b) => b.date - a.date);
    const years = new Map();
    for (const p of poems) {
      const y = p.date.getUTCFullYear();
      if (!years.has(y)) years.set(y, []);
      years.get(y).push(p);
    }
    return [...years].map(([year, items]) => ({ year, items }));
  });

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // "Oct 17"
  eleventyConfig.addFilter("shortDate", (d) => `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`);
  // "October 17, 2026"
  eleventyConfig.addFilter("longDate", (d) => `${MONTHS_LONG[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`);
  // "2026-10-17"
  eleventyConfig.addFilter("isoDate", (d) => d.toISOString().slice(0, 10));
  // RFC 822 for the RSS feed
  eleventyConfig.addFilter("rssDate", (d) => d.toUTCString());

  // First non-empty line of a poem, for the index.
  eleventyConfig.addFilter("firstLine", (html) => {
    const text = String(html || "")
      .replace(/<figure[\s\S]*?<\/figure>/gi, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<[^>]+>/g, "");
    const line = text.split("\n").map((s) => s.trim()).find(Boolean) || "";
    return line;
  });

  eleventyConfig.addFilter("lineCount", (html) => {
    const text = String(html || "").replace(/<figure[\s\S]*?<\/figure>/gi, "").replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n").replace(/<[^>]+>/g, "");
    return text.split("\n").filter((s) => s.trim()).length;
  });

  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
