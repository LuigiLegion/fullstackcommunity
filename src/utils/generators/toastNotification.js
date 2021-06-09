// Initializations
const toastNotification = (message, color) => {
  window.M.toast({
    html: `<span>${message}</span>`,
    classes: color,
  });
};

// Exports
export default toastNotification;
