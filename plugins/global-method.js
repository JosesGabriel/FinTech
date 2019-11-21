export default (ctx, inject) => {
  const globalMethod = {
    limitDisplayString: (string, limit = 5, ellipsis = false) => {
      if (string == undefined || string.length == 0) {
        return;
      }
      if (string.length > limit) {
        const trimmed = string.slice(0, limit).trim();
        return `${trimmed}${ellipsis == true ? "..." : ""}`;
      }
      return string;
    }
  };

  inject("globalMethod", globalMethod);
};
