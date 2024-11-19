import {useLoaderData} from '@remix-run/react';

export async function loader({context}) {
  const data = await context.storefront.query(EMPLOYES_QUERRY);
  return {employees: data.metaobjects.nodes};
}

export default function OurEmpployees() {
  const {employees} = useLoaderData();
  return (
    <>
      <h2>Nos Employées</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map(
          ({
            id,
            firstname,
            lastname,
            email,
            age,
            position,
            profilePicture,
            salary,
          }) => (
            <div key={id} className="border p-4">
              <h3>
                {firstname.value} {lastname.value}
              </h3>
              <img src={profilePicture.value} alt="" />
              <p>{email.value}</p>
              <p>{age.value}</p>
              <p>{position.value}</p>
              {salary.value}
            </div>
          ),
        )}
      </div>
    </>
  );
}

const EMPLOYES_QUERRY = ` #graphql
    query employees {
        metaobjects(first: 250, type: "employe") {
            nodes {
                id
                firstname :field(key: "first_name"){
                    value
                }
                lastname : field(key : "last_name" ){
                    value
                }
                profilePicture :field(key : "profile_picture"){
                    value
                }
                age :field(key: "age"){
                    value
                }
                position :field(key : "position"){
                    value
                }
                salary :field(key : "salary"){
                value
                }
                email :field(key : "email"){
                    value
                }
            }
        }
    }
`;
