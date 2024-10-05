import { MENU_ITEM_PREFIX } from "./menu";

type LoginData = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  name: string;  
  picture: string;
  verified_email: true;
  token?: string;
}

type FormData = {[key: string]: any};
// {
//     openAIKey: string;
//     theme: string;
//     maxTokens: string;
//     menuitem1: string;
//     menuitem1name: string;
//     menuitem2: string;
//     menuitem2name: string;
//     model: string;
// }

function FillFormWithData(items: FormData) {
  (document.getElementById("apiKey") as HTMLInputElement).value =
    items.openAIKey;
  (document.getElementById("theme") as HTMLInputElement).value =
    items.theme || "light";
  (document.getElementById("maxTokens") as HTMLInputElement).value =
    items.maxTokens || "1000";
  (document.getElementById("menuitem1") as HTMLInputElement).value =
    items.menuitem1 || "";
  (document.getElementById("menuitem1name") as HTMLInputElement).value =
    items.menuitem1name || "";
  (document.getElementById("menuitem2") as HTMLInputElement).value =
    items.menuitem2 || "";
  (document.getElementById("menuitem2name") as HTMLInputElement).value =
    items.menuitem2name || "";
  (document.getElementById("model") as HTMLInputElement).value =
    items.model || "gpt-4o-mini";
}

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  async function restoreControls() {
    await chrome.storage.sync.get(
      {
        openAIKey: "",
        theme: "",
        maxTokens: "",
        menuitem1: "",
        menuitem1name: "Custom item 1",
        menuitem2: "",
        menuitem2name: "Custom item 2",
        model: "",
      },
      FillFormWithData
    );
    showMenu();
  }

  function ShowSaveSuccessStatus() {
    // Update status to let user know options were saved.
    const status = document.getElementById("status");
    status && (status.textContent = "Options saved.");
    setTimeout(function () {
      status && (status.textContent = "");
    }, 3000);
  }

  // Saves options to chrome.storage
  function saveOptions() {
    const theme = (document.getElementById("theme") as HTMLInputElement).value;
    const openAIKey = (document.getElementById("apiKey") as HTMLInputElement)
      .value;
    const maxTokens = (document.getElementById("maxTokens") as HTMLInputElement)
      .value;
    const menuitem1 = (document.getElementById("menuitem1") as HTMLInputElement)
      .value;
    const menuitem1name = (
      document.getElementById("menuitem1name") as HTMLInputElement
    ).value;
    const menuitem2 = (document.getElementById("menuitem2") as HTMLInputElement)
      .value;
    const menuitem2name = (
      document.getElementById("menuitem2name") as HTMLInputElement
    ).value;
    const model = (document.getElementById("model") as HTMLInputElement).value;
    const saveObject = {
      openAIKey,
      theme,
      maxTokens,
      menuitem1,
      menuitem1name,
      menuitem2,
      menuitem2name,
      model,
    };

    chrome.storage.sync.set(saveObject, ShowSaveSuccessStatus);

    chrome.contextMenus.update(`${MENU_ITEM_PREFIX}menuitem1`, {
      visible: !!menuitem1,
      title: menuitem1name,
    });

    chrome.contextMenus.update(`${MENU_ITEM_PREFIX}menuitem2`, {
      visible: !!menuitem2,
      title: menuitem2name,
    });
  }

  function clearOptions() {
    FillFormWithData({
      openAIKey: "",
      theme: "",
      maxTokens: "",
      menuitem1: "",
      menuitem1name: "",
      menuitem2: "",
      menuitem2name: "",
      model: "",
    });
    chrome.storage.sync.clear();
  }

  async function login() {
    const token = await chrome.identity.getAuthToken({interactive: true});
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${token.token}`
        }
      });
      const data = await response.json();
      data.token = token.token;
      chrome.storage.sync.set({...data});
      showAvatar(data);
    }
    catch (e: any) {
      if (document.getElementById("loginError")) {
        document.getElementById("loginError")!.innerText = e.message;
      }
    }
  }

  async function showMenu() {
    const loginData = await chrome.storage.sync.get({token: "", given_name: "", family_name: "", picture: ""});
    if (loginData.token) {
      showAvatar(loginData as LoginData);
    }
    else {
      showLoginButton();
    }
  }

  function showAvatar(data: LoginData) {
    if (document.getElementById("avatar")) {
      (document.getElementById("avatar") as HTMLImageElement).src = data?.picture;
      (document.getElementById("avatar") as HTMLImageElement).alt = data?.given_name + " " + data?.family_name;
      (document.getElementById("avatar") as HTMLImageElement).style.display = "block";
      (document.getElementById("loginButton") as HTMLDivElement).style.display = "none";
    }
  }

  function showLoginButton() {
    (document.getElementById("avatar") as HTMLImageElement).style.display = "none";
    (document.getElementById("loginButton") as HTMLDivElement).style.display = "block";
  }

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("saveButton")
    ?.addEventListener("click", saveOptions);
  document
    .getElementById("clearButton")
    ?.addEventListener("click", clearOptions);
  document
    .getElementById("loginButton")
    ?.addEventListener("click", login);
  restoreControls();
});
