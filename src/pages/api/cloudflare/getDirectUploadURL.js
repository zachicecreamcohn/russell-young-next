import fetch from 'node-fetch';



export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { id, url } = await getDirectUploadUrl();
  console.log(id, url);
  res.status(200).json({ id, url, success: true });
}

async function getDirectUploadUrl() {
  const expiry = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 minutes from now
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // generate a unique identifier for the image
  
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
      'X-Auth-Email': process.env.CLOUDFLARE_EMAIL,
      'X-Auth-Key': process.env.CLOUDFLARE_API_KEY,
    },
    body: `-----011000010111000001101001\r\nContent-Disposition: form-data; name="expiry"\r\n\r\n${expiry}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="id"\r\n\r\n${id}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="requireSignedURLs"\r\n\r\n\r\n-----011000010111000001101001--\r\n\r\n`,
  });
  
  if (!response.ok) {
    throw new Error(`Failed to get direct upload URL: ${response.statusText}`);
  }
  
    const data = await response.json();
    console.log(data);
    return {
        url: data.result.uploadURL,
        id : data.result.id,
    }
}
