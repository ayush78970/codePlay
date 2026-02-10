import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

const cld = new Cloudinary({
  cloud: {
    cloudName: "YOUR_CLOUD_NAME"
  }
});

const myImage = cld.image("profile_images/user123.png");

<AdvancedImage cldImg={myImage} />