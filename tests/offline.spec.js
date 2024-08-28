const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    test.setTimeout("600000");
    await page.context().setOffline(false);
    await page.goto("http://test.guichet-social.population.gov.mg/");
    await page.getByPlaceholder("Identifiant").click();
    await page.getByPlaceholder("Identifiant").fill("istanandava1");
    await page.getByPlaceholder("Mot de passe").click();
    await page.getByPlaceholder("Mot de passe").fill("123456789");
    await page.getByRole("button", { name: "Se connecter" }).click();
});

test("collecteMigrationEntrante", async ({ page, context }) => {
    test.setTimeout(120000); // Timeout prolongé pour cette opération
    await page.getByRole("button", { name: "Enregistrer" }).click();

    // Attendre l'apparition du bouton "Finir la synchronisation!"
    await page.waitForSelector('button:has-text("Finir la synchronisation!")', {
        timeout: 600000, // Timeout étendu à 10 minutes pour la synchronisation
    });

    // Cliquer sur le bouton "Finir la synchronisation!"
    await page.getByRole("button", { name: "Finir la synchronisation!" }).click();

    // Cliquer sur le bouton "OK" pour terminer
    await page.getByRole("button", { name: "OK" }).click();

    // Passer en mode hors ligne
    await context.setOffline(true)
});