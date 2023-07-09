const accountId = "your_account_id";
const bucketId = "your_bucket_id";
const apiToken = "your_api_token";

const generateDownloadLink = async (childID) => {
    const fileName = `${childID}.tif`;
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/buckets/${bucketId}/download_url/${fileName}`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    const data = await response.json();
    const downloadLink = data.result.url;
    return downloadLink;
  } catch (error) {
    console.error(error);
  }
};

generateDownloadLink();
