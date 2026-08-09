module.exports = function (eleventyConfig) {
  // 정적 파일 그대로 복사
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy({ "src/assets/images/common/favicon.png": "favicon.png" });

  // 날짜 포맷: 2024-03-15 -> 2024.03.15
  eleventyConfig.addFilter("dateKR", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d)) return "";
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getUTCFullYear()}.${p(d.getUTCMonth() + 1)}.${p(d.getUTCDate())}`;
  });

  eleventyConfig.addFilter("isoDate", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return isNaN(d) ? "" : d.toISOString().slice(0, 10);
  });

  // 뉴스 컬렉션 (최신순)
  eleventyConfig.addCollection("news", (collection) =>
    collection.getFilteredByGlob("src/news/*.md").sort((a, b) => b.data.date - a.data.date)
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
