export const getPublicURL = (relativePathFromPublicDirectory: string): string => {
  const path = relativePathFromPublicDirectory;
  return `${import.meta.env.BASE_URL}${path.startsWith("/") ? path.slice(1) : path}`;
};
