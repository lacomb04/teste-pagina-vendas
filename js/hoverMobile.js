// Detecta se o dispositivo é móvel
function isMobileDevice() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}

// Remove a classe hover para dispositivos móveis
function removeHoverCssForMobile() {
  if (isMobileDevice()) {
    try {
      // Itera sobre todas as folhas de estilo
      for (let i = 0; i < document.styleSheets.length; i++) {
        let styleSheet = document.styleSheets[i];

        // Ignora folhas de estilo de terceiros
        if (!styleSheet.cssRules) continue;

        // Itera sobre todas as regras css
        for (let j = styleSheet.cssRules.length - 1; j >= 0; j--) {
          let cssRule = styleSheet.cssRules[j];

          // Remove regras css que tenham :hover
          if (cssRule.selectorText && cssRule.selectorText.includes(":hover")) {
            styleSheet.deleteRule(j);
          }
        }
      }
    } catch (e) {
      console.error("Erro ao acessar folha de estilo: ", e);
    }
  }
}

// Chama a função ao carregar a página
window.addEventListener("load", removeHoverCssForMobile);
