function onFoundryLoaded() {
  const script = document.querySelector("script[src='scripts/foundry.js']");
  script.onload = () => {
    Hooks.on("renderJoinGameForm", renderJoinGameForm);
  };

  const key = `saved-autologin-${window.location.href}`;

  function renderJoinGameForm(form, $, data) {
    const auto = (() => {
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
      return {};
    })();

    if (auto.user) {
      form.form.userid.value = auto.user;
      form.form.password.value = auto.password;
    }
    form.form.addEventListener("submit", (e) => {
      localStorage.setItem(
        key,
        JSON.stringify({
          user: form.form.userid.value,
          password: form.form.password.value,
        })
      );
      console.log(localStorage.getItem("saved-autologin"));
    });
  }
}

if (window.location.pathname.endsWith("/join")) {
  window.addEventListener("FoundryFrameworkLoaded", onFoundryLoaded);
}
