import Card from '~/components/card';
import {employees} from '~/data/employes';

export default function Employees() {
  return (
    <div className="grid justify-center">
      <h1>Ours empployes</h1>
      <div className="grid gap-4 justify-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {employees.map((employe) => (
          <div key={employe.id}>
            <Card
              profilePicture={employe.profilePicture}
              firstname={employe.firstName}
              lastname={employe.lastName}
              email={employe.email}
              age={employe.age}
              position={employe.position}
              salary={employe.salary}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
