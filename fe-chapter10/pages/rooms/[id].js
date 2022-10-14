import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Games = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log(id);
  }, []);

  return <p>Games: {id}</p>;
};

export default Games;
