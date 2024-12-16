import iconeRadio from '../assets/icone-01.png';
import iconeKodak from '../assets/icone-02.png';
import iconeToaster from '../assets/icone-03.png';
import IconWithText from './IconWithText';

/**
 *
 * @returns {JSX.Element}
 */
export default function IconsWithText() {
  return (
    <div className="flex flex-col items-center md:flex-row justify-between py-16 ">
      <IconWithText
        text="Découvrez notre sélection de produits vintage qui capturent le charme d'antan et ajoutent une touche authentique."
        src={iconeRadio}
        alt="un vieux radio"
      />
      <IconWithText
        text="Nos livraisons sont soigneusement emballées pour garantir que chaque trésor arrive intact, prêt à être découvert."
        src={iconeKodak}
        alt="Un sac de transport"
      />
      <IconWithText
        text="La qualité intemporelle de nos produits vintage vous garantit des pièces qui résistent au temps et conservent leur éclat."
        src={iconeToaster}
        alt="Une montre"
      />
    </div>
  );
}
