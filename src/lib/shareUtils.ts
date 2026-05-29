export function getShareTier(
  source: string | null,
  isOriginal: boolean,
): 1 | 2 | 3 {
  if (isOriginal) return 1;
  if (source === "cookbook") return 3;
  return 2;
}

export function getShareTierLabel(tier: 1 | 2 | 3): string {
  switch (tier) {
    case 1:
      return "Original recipe";
    case 2:
      return "From the web";
    case 3:
      return "From a cookbook";
  }
}
