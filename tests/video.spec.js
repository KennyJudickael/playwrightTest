// @ts-check
const { test, expect, chromium } = require("@playwright/test");

test("video record", async ({ page }) => {
  test.setTimeout(1200);
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext({
    recordVideo: {
      dir: "videos/",
      size: { width: 800, height: 600 },
    },
  });
  await page.goto(
    "https://keycloak.ingenosya.mg/auth/realms/PAJMA/protocol/openid-connect/auth?client_id=PIP&redirect_uri=https%3A%2F%2Fpip-pajma.ingenosya.net%2F&state=4102c1d5-f411-47b9-8dc9-779db3015446&response_mode=fragment&response_type=code&scope=openid&nonce=fbacc2c2-8311-459d-ad29-ffb06339db8d"
  );

  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill("eugene");
  await page.locator("#password").click();
  await page.locator("#password").fill("123");
  await page.getByRole("button", { name: "Se connecter" }).click();

  await page.goto("https://pip-pajma.ingenosya.net/");
  await page.getByRole("link", { name: "Historique" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Nom de la tableNom de la table$/ })
    .locator("svg")
    .click();
  await page.getByRole("option", { name: "RealisationPhysique" }).click();
  await page.getByRole("button", { name: "Rechercher" }).click();

  await context.close();
});
