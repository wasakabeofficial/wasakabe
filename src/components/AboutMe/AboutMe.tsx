import { useEffect } from 'react';
import AboutMeMobileView from './AboutMeMobileView';
import AboutMeDesktopView from './AboutMeDesktopView';

type TextSegment = { text: string; className?: string };

const ABOUT_TITLE = {
  first: 'ARCHITECT',
  last: 'ALAN',
  subtitle: 'Software Development and Management Engineer, UTHH',
};

const badgeText = {
  mobile: 'Identity Architect Verified',
  desktop: 'Identification: Active',
};

const bioIntro: TextSegment[] = [
  { text: 'Forged at the intersection of ' },
  { text: 'Neural Logic', className: 'text-blood-red font-bold' },
  { text: ' and ' },
  { text: 'Cinematic Precision', className: 'text-blood-red font-bold' },
  { text: '.' },
];

const bioBodyMobile: TextSegment[] = [
  { text: 'I architect digital ecosystems where high-performance software engineering meets aggressive creative production.' },
];

const bioBodyDesktop: TextSegment[] = [
  { text: 'I architect digital ecosystems where high-performance software engineering meets aggressive creative production. My methodology treats code as choreography and visual assets as technical components. Whether deploying complex ML models or engineering sonic landscapes, the objective remains singular: ' },
  { text: 'Uncompromising Execution.', className: 'text-stark-white italic' },
];

const specifications = [
  { label: 'ARCHITECTURE'},
  { label: 'CREATIVE' },
  { label: 'PRODUCTION' },
];

const specificationsTitle = 'CORE_SPECIFICATIONS_MATRIX';
const buttonText = 'INITIATE_HANDSHAKE';

const biometric = {
  read: { label: 'BIOMETRIC_READ:', value: 'AUTHORIZED' },
  origin: { label: 'LOC_ORIGIN:', value: 'LAT_00.21_LON_78.50' },
};

const protocolLabel = 'PRTCL_V2.0';


export default function AboutMe () {
  useEffect(() => {
    const updateTimestamp = () => {
      const element = document.getElementById('timestamp-mobile');
      if (!element) return;
      const now = new Date();
      element.textContent = `LOCAL_SYNC: ${now.toTimeString().split(' ')[0]}`;
    };
    updateTimestamp();
    const id = setInterval(updateTimestamp, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <AboutMeMobileView
        ABOUT_TITLE={ABOUT_TITLE}
        badgeText={badgeText.mobile}
        bioIntro={bioIntro}
        bioBody={bioBodyMobile}
        specifications={specifications}
        specificationsTitle={specificationsTitle}
        buttonText={buttonText}
        biometric={biometric}
    
      />
      <AboutMeDesktopView
        ABOUT_TITLE={ABOUT_TITLE}
        badgeText={badgeText.desktop}
        bioIntro={bioIntro}
        bioBody={bioBodyDesktop}
        specifications={specifications}
        specificationsTitle={specificationsTitle}
        buttonText={buttonText}
        biometric={biometric}
        protocolLabel={protocolLabel}
      />
    </>
  );
}

export type { TextSegment };
