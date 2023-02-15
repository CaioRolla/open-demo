export const combineUrl = (url: string, uri: string): string => {
  if (uri.startsWith('/')) {
    return `${url}${uri}`;
  }

  if (uri.startsWith('http')) {
    return uri;
  }

  return `${url}/${uri}`;
};
