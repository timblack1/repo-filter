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

  it('renders a username input', () => {
    const usernameInput = element.shadowRoot.querySelector('.username');
    expect(usernameInput).to.exist;
    expect(usernameInput.label).to.equal('Enter a Github user name');
  });

  it('renders a filter input', () => {
    const filterInput = element.shadowRoot.querySelector('.filter');
    expect(filterInput).to.exist;
    expect(filterInput.label).to.equal("Filter this user's repos for...");
  });

  it('permits the user to search for a Github user', () => {
    const handler = element.usernameChanged;
    expect(handler).to.exist;
    // TODO: Start here.  Test this method.
    handler({});
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
