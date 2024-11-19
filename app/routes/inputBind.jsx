import Searchs from '~/components/Searchs';

export default function InputBind() {
  const searchData = [
    {id: 1, defaultValue: 'ggdf'},
    {id: 2, defaultValue: 'gdgd'},
    {id: 3, defaultValue: 'gdfg'},
  ];

  return (
    <>
      <Searchs searchs={searchData} />
    </>
  );
}
