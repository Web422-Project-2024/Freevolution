import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from "@/styles/Home.module.css";

const CategoryButton = ({ category, icon }) => {
  const router = useRouter();
  
  const handleClick = () => {
    const formattedCategory = category.toLowerCase().replace(/\s+/g, '-');
    router.push(`/games/category/${formattedCategory}`);
  };

  return (
    <button className={styles.categories} onClick={handleClick}>
      <Image src={icon} alt={`${category} icon`} width={25} height={25} />
      <span>{category}</span>
    </button>
  );
}

export default CategoryButton;
