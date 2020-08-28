import { html, fixture, expect } from '@open-wc/testing';

import '../src/app-main.js';

describe('AppMain', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html` <app-main></app-main> `);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot.querySelector('h1');
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('Repo Filter');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
