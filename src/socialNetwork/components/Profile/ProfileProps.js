import logo1 from "../../res/images/dragonLogo.jpg";
import image from "../../res/images/butterflyImg.jpg";

const ProfileProps = {
    profileLogo: logo1,
    profileMainImage: image,
    profileName:"someName",
    profileSurname:"someSurname",
    profileInfo:("some info, some extra info"),

    getLogo: function () {
        return ProfileProps.profileLogo;
    },
    getProfileMainImage: function () {
        return ProfileProps.profileMainImage;
    },
}

export default ProfileProps;

