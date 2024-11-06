import {Btn} from './Btn';
import Modal from './modal';
import EmployeesDetails from './employeeDetails';
import {useState} from 'react';

export default function Card({
  firstname,
  lastname,
  profilePicture,
  email,
  age,
  position,
  salary,
}) {
  const [isDetailsVisible, setIsDetailVisible] = useState(false);
  return (
    <div className="bg-gray-100 grid gap-4 justify-center p-6 max-w-[325px] rounded-lg drop-shadow-lg">
      <img src={profilePicture} alt={firstname} />
      <h2 className="text-center">
        {firstname} {lastname}
      </h2>
      <Btn
        content="Details"
        onClick={() => {
          setIsDetailVisible(true);
        }}
      />
      <Modal isVisible={isDetailsVisible} setIsVisible={setIsDetailVisible}>
        <EmployeesDetails
          firstName={firstname}
          lastName={lastname}
          email={email}
          age={age}
          position={position}
          salary={salary}
        />
      </Modal>
    </div>
  );
}
