export const toHashCode = (string) => {
  let hash = 0, char;
  if (string.length === 0) return hash;
  for (let i = 0; i < string.length; i++) {
    char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
		console.log((hash << 5));
    hash |= 0;
  }
  if (hash <= 99999) hash *= 10;
  return hash;
};
