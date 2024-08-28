// @ts-check
const { test, expect } = require("@playwright/test");
const { only } = require("node:test");

test.beforeEach(async ({ page }) => {
  await page.goto(
    "https://keycloak.ingenosya.mg/auth/realms/PAJMA/protocol/openid-connect/auth?client_id=PIP&redirect_uri=https%3A%2F%2Fpip-pajma.ingenosya.net%2F&state=4102c1d5-f411-47b9-8dc9-779db3015446&response_mode=fragment&response_type=code&scope=openid&nonce=fbacc2c2-8311-459d-ad29-ffb06339db8d"
  );

  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill("eugene");
  await page.locator("#password").click();
  await page.locator("#password").fill("123");
  await page.getByRole("button", { name: "Se connecter" }).click();
});

test("premierTest", async ({ page }) => {
  await page.goto("https://pip-pajma.ingenosya.net/");
  await page.getByRole("link", { name: "Historique" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Nom de la tableNom de la table$/ })
    .locator("svg")
    .click();
  await page.getByRole("option", { name: "RealisationPhysique" }).click();
  await page.getByRole("button", { name: "Rechercher" }).click();
});

test("deuxiemeTest", async ({ page }) => {
  await page.goto("https://pip-pajma.ingenosya.net/");
  await page.getByRole("group").locator("svg").first().click();
  await page
    .getByRole("option", { name: "projet de renforcement des" })
    .click();
  await page.getByRole("group").locator("svg").nth(2).click();
  await page.getByRole("option", { name: "2021" }).click();
  await page.getByRole("button", { name: "Filtrer" }).click();
});

// test.afterAll(async ({ page }) => {
//   await page.goto("https://pip-pajma.ingenosya.net/");
//   await page.getByRole("button", { name: "Open Menu" }).nth(1).click();
//   await page.getByRole("menuitem", { name: "Déconnexion" }).click();
// });
