import React, {useState} from 'react';
import Modal from '~/components/modal';

/**
 *
 * @returns {JSX.Element}
 */
export default function CalculatorCarbon() {
  const [homeSize, setHomeSize] = useState('');
  const [energySource, setEnergySource] = useState('');
  const [transport, setTransport] = useState('');
  const [meatConsumption, setMeatConsumption] = useState('');
  const [flightFrequency, setFlightFrequency] = useState('');
  const [recycling, setRecycling] = useState('');
  const [usedGoods, setUsedGoods] = useState('');
  const [footprint, setFootprint] = useState(null);
  const [isDetailsVisible, setIsDetailVisible] = useState(false);

  /**
   * @returns {void}
   */
  function calculator() {
    const homeFactor =
      homeSize === 'small' ? 2 : homeSize === 'medium' ? 5 : 10;
    const energyFactor =
      energySource === 'electric' ? 2 : energySource === 'gas' ? 3 : 1;
    const transportFactor =
      transport === 'car' ? 4 : transport === 'public' ? 2 : 1;
    const meatFactor =
      meatConsumption === 'high' ? 3 : meatConsumption === 'medium' ? 2 : 1;
    const flightFactor =
      flightFrequency === 'often' ? 5 : flightFrequency === 'sometimes' ? 3 : 1;
    const recyclingFactor =
      recycling === 'always' ? -1 : recycling === 'sometimes' ? 0 : 1;
    const usedGoodsFactor = usedGoods === 'yes' ? -2 : 0;

    const totalFootprint =
      homeFactor +
      energyFactor +
      transportFactor +
      meatFactor +
      flightFactor +
      recyclingFactor +
      usedGoodsFactor;
    setFootprint(totalFootprint);
    setIsDetailVisible(true);
  }

  return (
    <section className="text-textBrown font-lora flex flex-col gap-4">
      <h2 className="font-kreon">Calculatrice d&apos;Empreinte Carbone</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="homeSize">Taille de votre logement : </label>
          <select
            value={homeSize}
            onChange={(e) => setHomeSize(e.target.value)}
            id="homeSize"
            className="p-1 rounded-sm shadow-md"
          >
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="energySource">
            Source d&apos;énergie principale :
          </label>
          <select
            className="p-1 rounded-sm shadow-md"
            id="energySource"
            value={energySource}
            onChange={(e) => setEnergySource(e.target.value)}
          >
            <option value="electric">Électricité</option>
            <option value="gas">Gaz</option>
            <option value="wood">bois</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="transport">Mode de transport principal :</label>
          <select
            className="p-1 rounded-sm shadow-md"
            id="transport"
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
          >
            <option value="car">Voiture</option>
            <option value="public">Transport public</option>
            <option value="bike">Vélo/À pied</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="meat">Consommation de viande :</label>
          <select
            id="meat"
            value={meatConsumption}
            onChange={(e) => setMeatConsumption(e.target.value)}
            className="p-1 rounded-sm shadow-md"
          >
            <option value="high">Élevée</option>
            <option value="medium">Moyenne</option>
            <option value="low">Faible</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="flig">Fréquence des voyages en avion :</label>
          <select
            id="flig"
            value={flightFrequency}
            onChange={(e) => setFlightFrequency(e.target.value)}
            className="p-1 rounded-sm shadow-md"
          >
            <option value="often">Souvent</option>
            <option value="sometimes">Parfois</option>
            <option value="rarely">Rarement</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="recycling">Habitudes de recyclage :</label>
          <select
            id="recycling"
            className="p-1 rounded-sm shadow-md"
            value={recycling}
            onChange={(e) => setRecycling(e.target.value)}
          >
            <option value="always">Toujours</option>
            <option value="sometimes">Parfois</option>
            <option value="never">Jamais</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="used">
            Achetez-vous principalement des articles usagés ?
          </label>
          <select
            className="p-1 rounded-sm shadow-md"
            id="used"
            value={usedGoods}
            onChange={(e) => setUsedGoods(e.target.value)}
          >
            <option value="yes">Oui</option>
            <option value="no">Non</option>
          </select>
        </div>
      </div>
      <button
        className="bg-textBrown text-light px-4 py-2 w-fit  shadow-btnBrown hover:shadow-btnBrownHover cursor-pointer  rounded-sm"
        onClick={calculator}
      >
        Calculer mon empreinte carbone
      </button>
      <Modal isVisible={isDetailsVisible} setIsVisible={setIsDetailVisible}>
        {footprint && (
          <div className="flex flex-col gap-4 ">
            <h3 className="font-kreon text-[1.2rem]">
              Votre empreinte carbone estimée :
            </h3>
            <h4 className="font-bold text-[1.8rem] ">
              {footprint} tonnes de CO2 par an
            </h4>
            <div>
              <p>
                <strong>Indicateur :</strong>
              </p>
              <p>Moins de 5 tonnes : Faible</p>
              <p>5 à 10 tonnes : Moyenne</p>
              <p>Plus de 10 tonnes : Élevée</p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
