class Upload {
    constructor(file, childID) {
        this.file = file;
        this.childID = childID;
    }

    // get a direct upload URL from cloudflare
    async getUploadURL() {
        return new Promise((resolve, reject) => {
            fetch("https://api.russellyoung.zachcohndev.com/demo/getUploadURL", {
                method: "GET",
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    this.uploadURL = data.result.uploadURL;
                    this.uniqueID = data.result.id;
                    resolve(this.uploadURL);
                } else {
                    reject(data.error);
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    async upload() {
        try {
          const formData = new FormData();
          formData.append("file", this.file);
    
          const uploadURL = await this.getUploadURL();
          const response = await fetch(uploadURL, {
            method: "POST",
            body: formData,
          });
    
          if (response.ok) {
            console.log("Upload successful");
            fetch(
              `https://api.russellyoung.zachcohndev.com/demo/saveImageIDInDB?childID=${this.childID}&imageID=${this.uniqueID}`,
              {
                method: "GET",
              }
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                if (data.success) {
                  console.log("Image ID saved in DB");
                }
              });
            return true;
          } else {
            console.error(response.status);
            return false;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      }
}

export default Upload;
