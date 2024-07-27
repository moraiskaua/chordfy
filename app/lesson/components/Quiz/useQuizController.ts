import { useState } from 'react';

export const useQuizController = (
  initialHearts: number,
  initialPercentage: number,
) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);

  return { hearts, percentage };
};
