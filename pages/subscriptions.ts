import { Page, Locator, expect, test } from '@playwright/test';

export class SubscriptionsPage {
  readonly page: Page;
  currentPage: Page;

  constructor(page: Page) {
    this.page = page;
    this.currentPage = page;
  }

  get allSubscriptionsValue(): Locator {
    return this.currentPage.getByRole('link', { name: 'Все дела' });
  }

  get submitButton(): Locator {
    return this.currentPage.locator(`//div[@class='b-floating_button-el']`);
  }

  get addNewCaseButton(): Locator {
    return this.currentPage.locator('.b-floating_button-icon_list-item-content').first();
  }

  get nameFieldNewCaseOnModal(): Locator {
    return this.currentPage.locator('[qa-control-name="Name"] input');
  }

  get caseTypeFieldModal(): Locator {
    return this.currentPage.locator('[qa-control-name="ProjectType"] input');
  }

  get caseTypeDropdownOption(): Locator {
    return this.currentPage.locator('[qa-control-name="ProjectType"]').getByText('Подписка на дела судов общей юрисдикции', { exact: true });
  }

  get submitModalButton(): Locator {
    return this.currentPage.locator('.b-common-form_submitters-item [type="submit"]');
  }

  caseNametable(name: string): Locator {
    return this.currentPage.locator(`//a[normalize-space(text())="${name}"]`);
  }

  get organizationField(): Locator {
    return this.currentPage.locator(`//input[@placeholder='Организация для отслеживания']`);
  }

  get innField(): Locator {
    return this.currentPage.locator(`//input[@placeholder='ИНН']`);
  }

  get ogrnField(): Locator {
    return this.currentPage.locator(`//input[@placeholder='ОГРН']`);
  }

  get dateFilterField(): Locator {
    return this.currentPage.locator(`//input[@placeholder='Не отслеживать дела с датой регистрации ранее']`);
  }

  get checkBoxIstec(): Locator {
    return this.currentPage.locator(`//label[@title='Является истцом']`);
  }

  get checkBoxResponse(): Locator {
    return this.currentPage.locator(`//label[@title='Является ответчиком']`);
  }

  get checkBoxOtherType(): Locator {
    return this.currentPage.locator(`//label[contains(@title,'Любой иной тип участия')]`);
  }

  get openOrgDropDown(): Locator {
    return this.currentPage.locator(`//input[@placeholder='Организация для отслеживания']/following-sibling::i[@key="open-close-button"]`);
  }

  get selectOrgOnDropDown(): Locator {
    return this.currentPage.locator(`//span[contains(text(),'АО "ТБАНК"')]`);
  }

  get sortingByNameInTable(): Locator {
    return this.currentPage.locator('div.ui-table-head-title[title="Дата создания"]');
  }

  get checkUpdatedDataCase(): Locator {
    return this.currentPage.getByText('Данные обновлены');
  }

  get saveEditCaseButton(): Locator {
    return this.currentPage.locator(`//div[@class='b-floating_button-el']`);
  }

  get monitoringItemCaseSelect(): Locator {
    return this.currentPage.getByText('Поставлено на мониторинг', { exact: true });
  }

  get monitoringStep(): Locator {
    return this.currentPage.locator('.ui-steps-item--selected');
  }

  get eventsTabCase(): Locator {
    return this.currentPage.locator('a.item[title="События"]');
  }

  get eventOnListEvents(): Locator {
    return this.currentPage.locator('common-link-catch').filter({ hasText: 'Поставлено на мониторинг' });
  }

  get popupOpenedCase(): Locator {
    return this.currentPage.locator(`//header[@class='b-popup-header']`);
  }

  get notyfyChecking(): Locator {
    return this.currentPage.locator('.b-noty_body', { hasText: 'Данные сохранены' });
  }

  get popupNameCase(): Locator {
    return this.currentPage.locator(`//input[@placeholder='Название']`);
  }

  get popupFullDayCase(): Locator {
    return this.currentPage.locator(`//label[@title='Весь день']//span[1]`);
  }

  private async click(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  private async fill(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  async waitForNoOverlay() {
    const loaderOverlay = this.currentPage.locator('.b-common_content_loader-progress-overlay--run');
    if (await loaderOverlay.isVisible()) {
      await loaderOverlay.waitFor({ state: 'hidden', timeout: 30000 });
    }

    const popupOverlay = this.currentPage.locator('.popup-overlay-background.b-popup-overlap-background--show');
    if (await popupOverlay.isVisible()) {
      await popupOverlay.waitFor({ state: 'hidden', timeout: 30000 });
    }
  }

  async checkOpenedPage() {
    await test.step('Check item "Все дела" is open', async () => {
      await this.allSubscriptionsValue.waitFor({ state: 'visible' });
    });
  }

  async createNewDataButton() {
    await this.click(this.submitButton);
  }

  async addNewDealButton() {
    await this.click(this.addNewCaseButton);
  }

  async nameModalFieldFill(name: string) {
    await this.fill(this.nameFieldNewCaseOnModal, name);
  }

  async caseTypeFieldModalFill(type: string) {
    await this.fill(this.caseTypeFieldModal, type);
    await this.click(this.caseTypeDropdownOption);
  }

  async clickSubmitButtonModal() {
    await this.click(this.submitModalButton);

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
    ]);

    await newPage.waitForLoadState();
    await newPage.close();
  }

  async sortingActualyData() {
    await this.sortingByNameInTable.waitFor();
    await this.sortingByNameInTable.click();
    await this.sortingByNameInTable.click();

  }

  async caseNameInTable(name: string) {
    await this.caseNametable(name).waitFor();
    await expect(this.caseNametable(name)).toHaveText(name);
  }

  async openCreatedCase(name: string) {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.caseNametable(name).click(),
    ]);
    await newPage.waitForLoadState();

    this.currentPage = newPage;
    return newPage;
  }

  async innFieldCase() {
    await this.innField.waitFor();
    await expect(this.innField).toHaveValue('');
  }

  async ogrnFieldCase() {
    await this.ogrnField.waitFor();
    await expect(this.ogrnField).toHaveValue('');
  }

  async dateFilterCase() {
    await this.dateFilterField.waitFor();
    await expect(this.dateFilterField).toHaveValue('');
  }

  async checkBoxIstecCase() {
    await this.checkBoxIstec.waitFor();
    await expect(this.checkBoxIstec).not.toBeChecked();
  }

  async checkBoxResponseCase() {
    await this.checkBoxResponse.waitFor();
    await expect(this.checkBoxResponse).not.toBeChecked();
  }

  async checkBoxOtherTypeCase() {
    await this.checkBoxOtherType.waitFor();
    await expect(this.checkBoxOtherType).not.toBeChecked();
  }

  async selectValueOrganization(name: string) {
    await this.organizationField.waitFor();
    await expect(this.organizationField).toHaveValue('');
    await this.click(this.openOrgDropDown);
    await this.click(this.selectOrgOnDropDown);
    await expect(this.organizationField).toHaveValue(name);
  }

  async innFieldCaseFull(number: string) {
    await this.innField.waitFor();
    await expect(this.innField).toHaveValue(/^\d+$/);
    await expect(this.innField).toHaveValue(number);
  }

  async ogrnFieldCaseFull(number: string) {
    await this.ogrnField.waitFor();
    await expect(this.ogrnField).toHaveValue(/^\d+$/);
    await expect(this.ogrnField).toHaveValue(number);
  }

  async checkBoxIstecCaseSelected() {
    await this.checkBoxIstec.waitFor();
    await this.checkBoxIstec.check();
    await expect(this.checkBoxIstec).toBeChecked();
  }

  async checkBoxResponseCaseSelected() {
    await this.checkBoxResponse.waitFor();
    await this.checkBoxResponse.check();
    await expect(this.checkBoxResponse).toBeChecked();
  }

  async checkBoxOtherTypeCaseSelected() {
    await this.checkBoxOtherType.waitFor();
    await this.checkBoxOtherType.check();
    await expect(this.checkBoxOtherType).toBeChecked();
  }

  async saveEditButtonCaseForm() {
    await this.click(this.saveEditCaseButton);
  }

  async checkIfFieldsIsDisabled() {
    await this.checkUpdatedDataCase.waitFor();
    await this.organizationField.waitFor();
    await expect(this.organizationField).toBeDisabled();
    await expect(this.innField).toBeDisabled();
    await expect(this.ogrnField).toBeDisabled();
  }

  async selectMonitoringItemCase() {
    await this.waitForNoOverlay();
    await this.monitoringItemCaseSelect.waitFor({ state: 'visible' });
    await this.monitoringItemCaseSelect.click();
    await expect(this.monitoringStep).toHaveAttribute('title', 'Поставлено на мониторинг');
  }

  async selectTabEventsCase() {
    await this.eventsTabCase.waitFor({ state: 'visible' });
    await this.eventsTabCase.click();
    await expect(this.eventsTabCase).toHaveClass(/active/);
  }

  async eventOnTheListCase() {
    await this.currentPage.getByRole('button', { name: 'Закрыть' }).first().click();
    await this.currentPage.locator('[title="Дела обновлены"]').waitFor({ state: 'detached' });
    await this.currentPage.getByRole('button', { name: 'Закрыть' }).first().click();
    await this.eventOnListEvents.waitFor();
  }

  async redirectOnModalFullEvent() {
    await this.eventOnListEvents.waitFor();
    await this.eventOnListEvents.click();
    await expect(this.popupOpenedCase).toHaveText('Постановка на мониторинг');
  }

  async popupFieldsCase() {
  await this.popupNameCase.waitFor();
  await expect(this.popupNameCase).toHaveValue('Поставлено на мониторинг');
  await expect(this.popupFullDayCase).toBeChecked();

  const value = await this.currentPage.locator('[placeholder="Дата начала"]').inputValue();
  const now = new Date();
  const expectedDate = now.toLocaleDateString('ru-RU');

  expect(value).toBe(expectedDate);
  }

//   async archiveAndDeleteCurrentCase() {
  
//   const url = this.currentPage.url();
//   const match = url.match(/\/case\/([^/]+)\/events/);
//   if (!match) throw new Error('UUID project does not found');

//   const uuid = match[1];
//   const cookies = await this.currentPage.context().cookies();
//   const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

//   const archiveStatus = await this.currentPage.evaluate(async ({ uuid, cookieHeader }) => {
//     const response = await fetch('https://test-aqa.demo.case.one/api/ProjectAction/ArchiveBulkProject', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Cookie': cookieHeader,
//       },
//       body: JSON.stringify({ ProjectIds: [uuid] })
//     });
//     return response.status;
//   }, { uuid, cookieHeader });

//   if (archiveStatus !== 200) {
//     throw new Error(`Archivate error ${uuid}, status: ${archiveStatus}`);
//   }

//   const deleteStatus = await this.currentPage.evaluate(async ({ uuid, cookieHeader }) => {
//     const response = await fetch(`https://test-aqa.demo.case.one/api/Projects/${uuid}`, {
//       method: 'DELETE',
//       headers: {
//         'Cookie': cookieHeader,
//       }
//     });
//     return response.status;
//   }, { uuid, cookieHeader });

//   if (deleteStatus !== 200) {
//     throw new Error(`Delete error ${uuid}, status: ${deleteStatus}`);
//   }

//   console.log(`Project ${uuid} sucsessful archivated and deleted.`);
// }
}
