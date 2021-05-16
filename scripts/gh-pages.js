var ghpages = require("gh-pages");

ghpages.publish(
  "public", // path to public directory
  {
    branch: "gh-pages",
  },
  () => {
    console.log("Deploy Complete!");
  }
);
