export const getDaysUntil = (dateString) => {
  if (!dateString) return 999;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const target = new Date(dateString);
  target.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getUrgencyLevel = (dateString, isFrozen = false) => {
  if (isFrozen) return "safe";
  const days = getDaysUntil(dateString);
  if (days < 0) return "expired";
  if (days <= 2) return "critical";
  if (days <= 5) return "warning";
  return "safe";
};

export const formatRelativeDate = (dateString) => {
  const days = getDaysUntil(dateString);
  if (days < 0) {
    const abs = Math.abs(days);
    return abs === 1 ? "Expired yesterday" : `Expired ${abs} days ago`;
  }
  if (days === 0) return "Expires today!";
  if (days === 1) return "Expires tomorrow";
  if (days <= 5) return `${days} days remaining`;
  return `In ${days} days (${dateString})`;
};

export const getUrgencyBadgeConfig = (urgency) => {
  switch (urgency) {
    case "expired":
      return {
        label: "Expired",
        bg: "bg-red-100 dark:bg-red-950/40",
        text: "text-red-700 dark:text-red-300",
        border: "border-red-200 dark:border-red-800",
        dot: "bg-red-600"
      };
    case "critical":
      return {
        label: "Critical (0-2d)",
        bg: "bg-orange-100 dark:bg-orange-950/40",
        text: "text-orange-800 dark:text-orange-300",
        border: "border-orange-300 dark:border-orange-800",
        dot: "bg-orange-500 animate-pulse"
      };
    case "warning":
      return {
        label: "Use Soon (3-5d)",
        bg: "bg-amber-50 dark:bg-amber-950/30",
        text: "text-amber-800 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800",
        dot: "bg-amber-400"
      };
    case "safe":
    default:
      return {
        label: "Fresh & Safe",
        bg: "bg-emerald-50 dark:bg-emerald-950/30",
        text: "text-emerald-800 dark:text-emerald-300",
        border: "border-emerald-200 dark:border-emerald-800",
        dot: "bg-emerald-500"
      };
  }
};
