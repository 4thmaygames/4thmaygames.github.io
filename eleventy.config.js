module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/app-ads.txt");
  eleventyConfig.addPassthroughCopy({ "src/assets/images/common/favicon.png": "favicon.png" });

  eleventyConfig.addFilter("isoDate", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return isNaN(d) ? "" : d.toISOString().slice(0, 10);
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
