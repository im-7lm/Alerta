const Alerta = {
  // Alerts
  alert({
    type,
    title,
    text,
    confirmButtonText,
    cancelButtonText,
    denyButtonText,
    confirmButtonColor,
    cancelButtonColor,
    denyButtonColor,
    language = "en",
    onConfirm,
    onCancel,
    onDeny,
    onShow,
    showIcon = true,
    showConfirmButton = true,
    showCancelButton = false,
    showDenyButton = false,
    closeOnOutsideClick = true,
    textSelection = true,
    backgroundBlur = false,
  }) {
    // Create Alert Elements
    const container = document.createElement("div");
    container.className = "alerta-container";
    container.id = "alerta-container";

    const alerta = document.createElement("div");
    alerta.className = `alerta alert-${
      type || "default"
    } animate__animated animate__bounceIn`;
    alerta.id = "Alerta-alert";

    // اللغة
    if (language === "ar") {
      alerta.classList.add("alerta-ar");
    } else {
      alerta.classList.add("alerta-en");
    }

    // Icons Types
    if (showIcon) {
      const icon = document.createElement("img");
      icon.className = "alerta-icon";
      if (type === "success") icon.src = "icons/success.svg";
      else if (type === "error") icon.src = "icons/error.svg";
      else if (type === "info") icon.src = "icons/info.svg";
      else if (type === "warning") icon.src = "icons/warning.svg";
      else if (type === "question") icon.src = "icons/question.svg";
      else icon.src = "icons/success.svg"; // Default
      alerta.appendChild(icon);
    }

    // Alert Title
    if (title) {
      const titleEl = document.createElement("h1");
      titleEl.textContent = title;
      alerta.appendChild(titleEl);
    }

    // Alert Text
    if (text) {
      const textEl = document.createElement("p");
      textEl.textContent = text;
      alerta.appendChild(textEl);
    }

    // Buttons Container
    const btnContainer = document.createElement("div");
    btnContainer.className = "buttons-container";

    // Confirm Button
    if (showConfirmButton) {
      const confirmBtn = document.createElement("a");
      confirmBtn.className = "button confirm";
      confirmBtn.innerHTML =
        confirmButtonText || (language === "ar" ? "تأكيد" : "Confirm");

      // Confirm Button Color
      if (confirmButtonColor) {
        confirmBtn.style.backgroundColor = confirmButtonColor;
      }

      confirmBtn.onclick = () => closeAlert("confirm");
      btnContainer.appendChild(confirmBtn);
    }

    // Cancel Button
    if (showCancelButton) {
      const closeBtn = document.createElement("a");
      closeBtn.className = "button cancel";
      closeBtn.innerHTML =
        cancelButtonText || (language === "ar" ? "إلغاء" : "Cancel");

      // Cancel Button Color
      if (cancelButtonColor) {
        closeBtn.style.backgroundColor = cancelButtonColor;
      }

      closeBtn.onclick = () => closeAlert("cancel");
      btnContainer.appendChild(closeBtn);
    }

    // Deny Button
    if (showDenyButton) {
      const denyBtn = document.createElement("a");
      denyBtn.className = "button deny";
      denyBtn.innerHTML =
        denyButtonText || (language === "ar" ? "رفض" : "Deny");

      // Deny Button Color
      if (denyButtonColor) {
        denyBtn.style.backgroundColor = denyButtonColor;
      }

      denyBtn.onclick = () => closeAlert("deny");
      btnContainer.appendChild(denyBtn);
    }

    if (btnContainer.children.length > 0) {
      alerta.appendChild(btnContainer);
    }
    container.appendChild(alerta);
    document.body.appendChild(container);

    // Outside click
    if (closeOnOutsideClick) {
      container.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
          closeAlert("outside");
        }
      });
    }

    // Text Selection
    if (!textSelection) {
      const alert = document.getElementById("Alerta-alert");
      // alert.style.userSelect = "none";
      alert.setAttribute("style", "user-select:none !important");
    }

    // Background Blur

    if (backgroundBlur) {
      let blurValue = "5px"; // default
      if (
        typeof backgroundBlur === "string" ||
        typeof backgroundBlur === "number"
      ) {
        blurValue = backgroundBlur;
      }
      container.style.backdropFilter = `blur(${blurValue})`;
    }

    // Close Alert Function
    function closeAlert(action) {
      alerta.classList.remove("animate__bounceIn");
      alerta.classList.add("animate__bounceOut", "animate__faster");

      alerta.addEventListener(
        "animationend",
        () => {
          if (action === "confirm" && onConfirm) onConfirm();
          if ((action === "close" || action === "outside") && onCancel)
            onCancel();
          if (action === "deny" && onDeny) onDeny();
          container.remove();
        },
        { once: true }
      );
    }

    // onShow
    alerta.addEventListener(
      "animationstart",
      () => {
        if (onShow) onShow();
      },
      { once: true }
    );
  },
};
