// const wavejs = require("wavesurfer.js");

module.exports = async function(eleventyConfig) { 

  eleventyConfig.setOutputDirectory("docs"); 

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`); 

  eleventyConfig.addPassthroughCopy("css/*.*");
  eleventyConfig.addPassthroughCopy("img/**/*.*");
  eleventyConfig.addPassthroughCopy("audio/**/*.*");
  eleventyConfig.addPassthroughCopy("js/*.js");
  eleventyConfig.addPassthroughCopy("sw.js");
  eleventyConfig.addPassthroughCopy("manifest.json");
  eleventyConfig.addPassthroughCopy("robot.txt");
 
};
