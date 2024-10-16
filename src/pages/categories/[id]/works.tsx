/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/categories/[id]/works.tsx
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';

export default function WorksPage() {
  // const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = router.query; // Get the category ID from the URL

  const fetchWorks = async () => {
    try {
      const response = await fetch('/api/works');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log({ data, id });
      return data;
    } catch (error) {
      console.error('Error fetching works:', error);
    }
  };

  const { data: worksData = [] } = useQuery({
    queryKey: ['worksData'],
    queryFn: fetchWorks,
  });

  return (
    <div>
      <h1>Works in Category</h1>
      <ul>
        {worksData.length > 0 ? (
          worksData.map((work: any) => (
            <li key={work.id} className="flex gap-1">
              <h2>{work.title}:</h2>
              <p>{work.description}</p>
            </li>
          ))
        ) : (
          <li>No works available for this category.</li>
        )}
      </ul>
    </div>
  );
}
