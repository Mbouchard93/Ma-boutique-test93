import iconeRadio from '../assets/icone-01.png';
import iconeKodak from '../assets/icone-02.png';
import iconeToaster from '../assets/icone-03.png';

import IconWithText from './IconWithText';
export default function IconsWithText() {
  return (
    <div className="flex flex-col items-center md:flex-row justify-around p-5 ">
      <IconWithText
        text="L'authenticité du son rétro, où chaque station raconte une histoire."
        src={iconeRadio}
        alt="image radio"
      />
      <IconWithText
        text="Capturer l'instant avec le charme du vintage, chaque cliché une œuvre"
        src={iconeKodak}
        alt="image d'appareil photo"
      />
      <IconWithText
        text="Le charme d'antan, pour un petit-déjeuner savoureux et vintage."
        src={iconeToaster}
        alt="image de grille pain"
      />
    </div>
  );
}
