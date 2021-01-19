import React, { useState } from 'react';
import styles from './index.less';

import { Button, Spin, Image } from 'antd';

export default function IndexPage() {
  const [loadingOne, setLoadingOne] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');

  async function fetchCats() {
    setLoadingOne(true);
    setLoadingTwo(true);
    setFirst('');
    setSecond('');

    const responseOne = await fetch('https://aws.random.cat/meow');
    await responseOne
      .json()
      .then((resOne) => {
        setLoadingOne(false);
        setFirst(resOne.file);
      })
      .catch((err) => console.log(err));

    const responseTwo = await fetch('https://aws.random.cat/meow');
    await responseTwo
      .json()
      .then((resTwo) => {
        setLoadingTwo(false);
        setSecond(resTwo.file);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Button
          disabled={loadingOne || loadingTwo}
          type="primary"
          onClick={fetchCats}
        >
          Загрузить
        </Button>
      </div>
      <div className={styles.row}>
        {loadingOne && <Spin />}
        {first && <Image src={first} width={300} height={200} />}
      </div>
      <div className={styles.row}>
        {loadingTwo && <Spin />}
        {second && <Image src={second} width={300} height={200} />}
      </div>
    </div>
  );
}
