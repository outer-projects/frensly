export const sortsPets = ["RARITY", "LUCK", "AVAILABILITY"];

export const sortsPlanets = ["RARITY", "REQUIREMENTS"];
export const sortByLuck = (a: any, b: any) => {
  return Number(b?.attributes ? b?.attributes[1].value : 0) - Number(a?.attributes ? a?.attributes[1].value : 0);
};
export const sortByLuckReverse = (a: any, b: any) => {
  return Number(a?.attributes ? a?.attributes[1].value : 0) - Number(b?.attributes ? b?.attributes[1].value : 0);
};
export const sortByRequirements = (a: any, b: any) => {
  return Number(b?.attributes ? b?.attributes[2].value : 0) - Number(a?.attributes ? a?.attributes[2].value : 0);
};
export const sortByRequirementsReverse = (a: any, b: any) => {
  return Number(a?.attributes ? a?.attributes[2].value : 0) - Number(b?.attributes ? b?.attributes[2].value : 0);
};
export const sortByAvailability = (a: any, b: any) => {
  return Number(a?.lockedUntil) - Number(b?.lockedUntil);
};
export const sortByAvailabilityReverse = (a: any, b: any) => {
  return Number(b?.lockedUntil) - Number(a?.lockedUntil);
};
export const sortByRarity = (a: any, b: any) => {
  return Number(b?.attributes ? b?.attributes[0].value : 0) - Number(a?.attributes ? a?.attributes[0].value : 0);
};
export const sortByRarityReverse = (a: any, b: any) => {
  return Number(a?.attributes ? a?.attributes[0].value : 0) - Number(b?.attributes ? b?.attributes[0].value : 0);
};