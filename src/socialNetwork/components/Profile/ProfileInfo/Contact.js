import s from "./ProfileInfo.module.css";
import React from "react";
import {
    githubLogo, facebookLogo,
    vkLogo, twitterLogo, instagramLogo,
    youtubeLogo, websiteLogo
} from "../../common/Defaults/defaultValues"

let getContactImage = (name) => {
    switch (name) {
        case "facebook":
            return facebookLogo;
        case "vk":
            return vkLogo;
        case "twitter":
            return twitterLogo;
        case "instagram":
            return instagramLogo;
        case "github":
            return githubLogo;
        case "youtube":
            return youtubeLogo;
        case "website":
            return websiteLogo;
        default:
            return null;

    }
}

const Contact = ({contactTitle, contactValue}) => {
    return (
        <span>
               {((contactValue != null) && (contactValue.includes(contactTitle) || contactTitle === "website")) ?
                   <span>
                       <a href={contactValue.includes("https") ? contactValue : ("https://" + contactValue)}
                          target="_blank" rel="noopener noreferrer">
                           <img src={getContactImage(contactTitle)} alt="" className={s.contactsImage}/>
                       </a>
                   </span>
                   : null}
        </span>
    );
}

export default Contact;