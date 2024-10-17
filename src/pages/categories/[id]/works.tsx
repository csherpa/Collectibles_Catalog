/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

export default function CategoryWorksPage() {
  const router = useRouter();
  const { id } = router.query; // Get the category ID from the URL

  const fetchWorks = async () => {
    try {
      const response = await fetch(`/api/categories/${id}/works`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log({ data, id });
      return data;
    } catch (err) {
      console.log('error in fetching works', err);
    }
  };

  const {
    data: worksData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['worksData', id],
    enabled: !!id, // Only fetch if `id` is defined
    queryFn: fetchWorks,
  });

  if (isLoading) return <p>Loading works...</p>;
  if (error) return <p>Error loading works</p>;
  console.log({ worksData });
  return (
    <div>
      <h1>Works for Category {id}</h1>
      {worksData && worksData.length > 0 ? ( // Ensure `worksData` is defined and has length
        <ul>
          {worksData.map((work: any) => (
            <li key={work.id}>
              <h2>{work.title}</h2>
              <p>{work.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No works found for this category.</p>
      )}
    </div>
  );
}
