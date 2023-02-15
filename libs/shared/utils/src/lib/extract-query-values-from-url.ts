export const extractQueryValuesFromUrl = (url: string) => {
  if (!url.split('?')[1]) {
    return {};
  }

  return JSON.parse(
    '{"' +
      decodeURI(url.split('?')[1])
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};
