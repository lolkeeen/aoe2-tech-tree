(function () {
  var params = new URLSearchParams(window.location.search);
  var frameId = params.get("frame_id");
  if (!frameId) return;

  var hostId = window.location.hostname.match(/^(\d+)\.discordsays\.com$/);
  var clientId = (hostId && hostId[1]) || window.DISCORD_CLIENT_ID || "";
  if (!clientId) return;

  var parentWindow = window.parent && window.parent.opener ? window.parent.opener : window.parent;
  var parentOrigin = "*";
  if (document.referrer) {
    try {
      parentOrigin = new URL(document.referrer).origin;
    } catch (error) {
      parentOrigin = "*";
    }
  }

  var allowed = {
    "https://discord.com": true,
    "https://discordapp.com": true,
    "https://ptb.discord.com": true,
    "https://ptb.discordapp.com": true,
    "https://canary.discord.com": true,
    "https://canary.discordapp.com": true,
    "https://staging.discord.co": true,
    "https://pax.discord.com": true,
    "null": true,
  };
  allowed[window.location.origin] = true;
  if (parentOrigin !== "*") allowed[parentOrigin] = true;

  var platform = params.get("platform");
  var mobileVersion = params.get("mobile_app_version") || "";
  var majorMobile = mobileVersion.indexOf(".") === -1 ? -1 : parseInt(mobileVersion.split(".")[0], 10);
  var payload = {
    v: 1,
    encoding: "json",
    client_id: clientId,
    frame_id: frameId,
  };
  if (platform !== "mobile" || majorMobile >= 250) payload.sdk_version = "2.5.0";

  window.addEventListener("message", function (event) {
    if (!allowed[event.origin]) return;
    var message = event.data;
    if (!Array.isArray(message) || message[0] !== 1) return;
    var data = message[1];
    if (!data || data.cmd !== "DISPATCH" || data.evt !== "READY") return;
    document.documentElement.classList.add("is-discord");
  });

  parentWindow.postMessage([0, payload], parentOrigin);
})();
