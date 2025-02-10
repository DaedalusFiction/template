const badWords = ["nigger", "bitch", "fuck", "cunt"];

export default function useProfanityFilter(content) {
  const result = badWords.some((word) => content.toLowerCase().includes(word));

  return { result };
}
