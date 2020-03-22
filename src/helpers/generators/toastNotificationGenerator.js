// Generator
const toastNotificationGenerator = (message, color) => {
  window.M.toast({
    html: `<span>${message}</span>`,
    classes: color
  })
}

// Exports
export default toastNotificationGenerator
