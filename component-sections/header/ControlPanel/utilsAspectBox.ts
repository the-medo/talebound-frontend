export interface AspectData {
  marker: {
    imgIdx: number;
  }[];
}

export const generateAspectData = () => {
  const randNumber = Math.floor(Math.random() * 5);
  const aspectData: AspectData = {
    marker: [],
  };
  for (let i = 0; i < randNumber; i++) {
    aspectData.marker.push({
      imgIdx: Math.floor(Math.random() * 10),
    });
  }

  return aspectData;
};
