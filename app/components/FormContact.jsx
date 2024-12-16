import {useState} from 'react';
import {Btn} from './Btn';
import Modal from './modal';
import imgContact from '../assets/contact.png';

/**
 * @returns {JSX.Element}
 */
export default function FormContact() {
  const [inputValue, setInputValue] = useState('');
  const [isDetailsVisible, setIsDetailVisible] = useState(false);

  /**
   * @param {React.FormEvent} e
   * @returns {void}
   */
  function handleSubmit(e) {
    e.preventDefault();
    setIsDetailVisible(true);
  }

  return (
    <div>
      <h3 className="font-kreon text-[1.6rem]">Ton Avis Compte</h3>
      <p>Pose nous ta question</p>
      <form className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="Nom" required />
        <input
          type="text"
          placeholder="Prénom"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <input
          type="text"
          className="col-span-2"
          placeholder="Email"
          required
        />
        <textarea
          name="message"
          className="col-span-2 p-2"
          placeholder="Message"
          required
        ></textarea>
        <Btn
          content="Envoyer"
          onClick={handleSubmit}
          className={'col-span-2'}
        />
      </form>
      <Modal isVisible={isDetailsVisible} setIsVisible={setIsDetailVisible}>
        <div className="flex flex-col gap-10 items-center">
          <h4 className="font-kreon text-[1.4rem]">
            Merci {inputValue} de nous avoir contactés!{' '}
          </h4>
          <p>
            Nous avons bien reçu ton message et nous le traiterons dans les 48
            heures. Si tu as besoin d&apos;une réponse immédiate, n&apos;hésite
            pas à nous appeler. À bientôt.
          </p>
          <img src={imgContact} className="h-[8rem]" alt="enveloppe" />
        </div>
      </Modal>
    </div>
  );
}
