import { useMemo } from "react";

const typesEnum = {
  alphabetically: "From A to Z",
  reverseAlphabetically: "From Z to A",
};

const sortAlphabetically = (array) => {
  const result = [...array].sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  return result;
};

const sortReverseAlphabetically = (array) => {
  const result = [...array].sort((a, b) => {
    if (a.name < b.name) return 1;
    if (a.name > b.name) return -1;
    return 0;
  });
  return result;
};

const getSortedArrayByType = (array, sortingType) => {
  switch (sortingType) {
    case typesEnum.alphabetically:
      return sortAlphabetically(array);
    case typesEnum.reverseAlphabetically:
      return sortReverseAlphabetically(array);
    default:
      return;
  }
};

export const useSorting = (initialArray, sortingType) => {
  const resultArray = useMemo(() => {
    return getSortedArrayByType(initialArray, sortingType);
  }, [sortingType, initialArray]);

  return resultArray;
};
