const blockCommentRegex = /\/\*[\S\s]*?\*\//g;
const lineCommentRegex = /\/\/.*/g;

export const parse = (str) => {
  const withoutComments = str
    .replace(blockCommentRegex, "")
    .replace(lineCommentRegex, "");
  return JSON.parse(withoutComments);
};
