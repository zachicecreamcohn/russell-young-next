// a class to handle cloudflare api calls (takes image ID)

class Image {
    constructor(imageID) {
        this.imageID = imageID;
        this.placeholderID = "41ecb093-5c88-458f-a9fb-23893a0da100";
        if (imageID == undefined) {
            this.imageID = this.placeholderID;
        }
    }

    


    // get the image from cloudflare
    // optional parameters: width, height
    getImage(options) {
        let width = options.width;
        let height = options.height;
        let url = "https://imagedelivery.net/5mGz3Xk8mbYIWkWOJDc_Vg/" + this.imageID;
        
        if (width !== undefined && height !== undefined) {
            url += "/w=" + width + ",h=" + height;
        }else if (width !== undefined) {
            url += "/w=" + width;
        }else if (height !== undefined) {
            url += "/h=" + height;
        } else {
            throw new Error("Image.getImage() requires at least one parameter (width or height)");
        }
    
        return url;
    }
    

    // gets thumbnail sized version
    getIcon() {
        const options = {
            height: 60
        }
        return this.getImage(options);
    }

    // Get a full sized version
    getStandardSized() {
        const options = {
            width: 1300
        }
        return this.getImage(options)
        }


    
}

export default Image;