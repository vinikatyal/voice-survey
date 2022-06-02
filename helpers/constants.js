export const objectify = (array) => {
  return array.map(([text, value]) => ({ text, value }));
};

export const convertToSentenceTable = (array) => {
  return array.map(([sentence, emotion, sentiment]) => ({
    sentence,
    emotion,
    sentiment,
  }));
};
