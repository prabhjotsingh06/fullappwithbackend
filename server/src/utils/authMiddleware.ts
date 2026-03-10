export const requireAuth = (context: any) => {
  if (!context.user) {
    throw new Error("not authenticated");
  }
};
