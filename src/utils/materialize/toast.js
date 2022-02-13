// Initializations
const toast = (message, color) =>
  window.M.toast({
    html: `<span>${message}</span>`,
    classes: color,
  });

// Exports
export default toast;
