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

const sendFile = async (fileUrl, ctx) => {
  try {
    // Fetch the file size
    const response = await axios.head(fileUrl);
    const fileSize = response.headers["content-length"];

    // Check if file size exceeds 50 MB
    if (fileSize > 50 * 1024 * 1024) {
      await ctx.reply("Sorry, the file size exceeds the 50 MB limit.");
      return;
    }

    // Shorten the URL
    const shortenedUrl = await shortenUrl(fileUrl);
    if (shortenedUrl) {
      await ctx.replyWithMarkdown(
        `Click here to download the file: ${shortenedUrl}\n\n_Please note that the original URL may still be accessible._`
      );
    } else {
      await ctx.reply("Error occurred while shortening URL. Please try again later.");
    }
  } catch (error) {
    console.error("Error sending file:", error.message);
    await ctx.reply("An error occurred while sending the file. Please try again later.");
  }
};

module.exports = {
  sendFile,
};
