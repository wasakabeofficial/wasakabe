import { MdCode, MdAutoAwesome, MdVideocam, MdSchool, MdSecurity } from "react-icons/md";
import type { IconType } from "react-icons";

export const SERVICE_ICONS: Record<string, IconType> = {
  "software-engineering": MdCode,
  "creative-direction": MdAutoAwesome,
  audiovisual: MdVideocam,
  mentorship: MdSchool,
  cybersecurity: MdSecurity,
};

export const DEFAULT_SERVICE_ICON: IconType = MdCode;
