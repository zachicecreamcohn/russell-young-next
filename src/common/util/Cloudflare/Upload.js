

class Upload {
  constructor(file, childID) {
    this.file = file;
    this.childID = childID;
  }

  async upload() {
    // get file extension
    const fileExtension = this.file.name.split('.').pop();
    // first, check if the file is a tif or tiff

    if (fileExtension === 'tif' || fileExtension === 'tiff') {
      // upload the file to Cloudflare (R2 via worker)
      try {
        console.log('uploading tiff file');
        console.log(this.file);
        await fetch('https://production.muddy-glade-38c1.zach-russellyoung836.workers.dev', {
          method: 'POST',
          headers: {
            'Content-Type': this.file.type,
            'filename': this.childID + '.' + fileExtension,
          },
          body: this.file
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.success = true;
          console.log('upload success');
        });

        return true;


        
      } catch (error) {
        console.error(`Error in Upload.upload(): ${error.message}\n${error.stack}`);
        return false;
      }

    }


    try {
      // get the upload URL from Cloudflare
      const response = await fetch('/api/cloudflare/getDirectUploadURL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      console.log(data.result);
      this.uploadURL = data.url;
      this.imageID = data.id;

      console.log(this.uploadURL);

      const formData = new FormData();
      formData.append('file', this.file);

      // upload the file to Cloudflare
      const uploadResponse = await fetch(this.uploadURL, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error(`HTTP error! status: ${uploadResponse.status}`);
      }

      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        throw new Error(uploadData.error);
      }

      console.log(uploadData);
      this.success = true;
      console.log('upload success');

      // add the image to the database
      const dbResponse = await fetch('/api/cloudflare/addImageToDB', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imageID: this.imageID,
          childID: this.childID
        })
      });

      if (!dbResponse.ok) {
        throw new Error(`HTTP error! status: ${dbResponse.status}`);
      }

      const dbData = await dbResponse.json();

      if (!dbData.success) {
        throw new Error(dbData.error);
      }

      this.success = true;

      return true;
    } catch (error) {
      console.error(`Error in Upload.upload(): ${error.message}\n${error.stack}`);
      return false;
    }
  }
}

export default Upload;
