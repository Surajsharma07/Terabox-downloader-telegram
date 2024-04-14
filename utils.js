const fetch = require("node-fetch");

const shortenUrl = async (url) => {
  try {
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
    const shortenedUrl = await response.text();
    return shortenedUrl;
  } catch (error) {
    console.error("Error shortening URL:", error);
    return null; // Return null in case of error
  }
};

const sendFile = async (item, ctx) => {
  if (item) {
    try {
      const shortenedUrl = await shortenUrl(item);
      if (shortenedUrl) {
        await ctx.replyWithMarkdown(
          `Click [here](${shortenedUrl}) to download the file.\n\n_Please note that the original URL may still be accessible._`
        );
      } else {
        ctx.reply("Error occurred while shortening URL. Please try again later.");
      }
    } catch (e) {
      console.error("Error sending file:", e);
      ctx.reply("An error occurred while sending the file. Please try again later.");
    }
  }
};

module.exports = {
  sendFile,
};
