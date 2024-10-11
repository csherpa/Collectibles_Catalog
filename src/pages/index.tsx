/* eslint-disable @typescript-eslint/no-explicit-any */
import localFont from 'next/font/local';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Link from 'next/link';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function Home() {
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log('error in fetching categories', err);
    }
  };

  const { data: categoriesData } = useQuery({
    queryKey: ['categoriesData'],
    queryFn: fetchCategories,
  });
  console.log({ categoriesData });

  useEffect(() => {
    console.log({ categoriesData });
  }, [categoriesData]);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1>Categories</h1>
      <ul>
        {categoriesData.map((category: any) => (
          <li key={category.id}>
            <Link href={`/works/${category.id}`}>{category.name} </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
