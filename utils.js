const axios = require("axios");

const shortenUrl = async (url) => {
  try {
    const response = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
    return response.data;
  } catch (error) {
    console.error("Error shortening URL:", error.message);
    return null; // Return null in case of error
  }
};

const sendFile = async (item, ctx) => {
  if (item) {
    try {
      const shortenedUrl = await shortenUrl(item);
      if (shortenedUrl) {
        await ctx.replyWithMarkdown(
          `Click here to download the file: ${shortenedUrl}\n\n_Please note that the original URL may still be accessible._`
        );
      } else {
        ctx.reply("Error occurred while shortening URL. Please try again later.");
      }
    } catch (e) {
      console.error("Error sending file:", e.message);
      ctx.reply("An error occurred while sending the file. Please try again later.");
    }
  }
};

module.exports = {
  sendFile,
};
