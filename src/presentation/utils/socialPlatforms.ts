import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons";

export const iconByPlatform: Record<string, IconType> = {
  youtube: FaYoutube,
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
};

export const nameByPlatform: Record<string, string> = {
  youtube: "YouTube",
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
};
