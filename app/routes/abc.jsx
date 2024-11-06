import {Btn} from '~/components/Btn';
import {Link} from '@remix-run/react';
export default function Abc() {
  return (
    <>
      <h1 className="text-red-500">allo</h1>
      <Btn
        content="cliquer"
        onClick={() => {
          alert('test');
        }}
      />
      <Link to="/def">ourEmploye </Link>
    </>
  );
}
