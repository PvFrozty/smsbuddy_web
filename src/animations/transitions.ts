export const springBouncy = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

export const springGentle = {
  type: "spring" as const,
  stiffness: 200,
  damping: 30,
};

export const springSnappy = {
  type: "spring" as const,
  stiffness: 500,
  damping: 25,
};

export const easeOut = {
  duration: 0.5,
  ease: "easeOut" as const,
};

export const easeInOut = {
  duration: 0.4,
  ease: "easeInOut" as const,
};
