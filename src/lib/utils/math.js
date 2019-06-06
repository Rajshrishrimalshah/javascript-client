export const getRandomNumber = max => Math.floor(Math.random() * Math.floor(max));
export const getNextRoundRobin = (total, current) => (current + 1 < total ? (current + 1) : 0)
