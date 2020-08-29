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

  it("permits the user to search for a Github user's repos", async () => {
    const method = element.usernameChanged.bind(element);
    expect(method).to.exist;
    await method({ target: { value: 'timblack1' } });
    expect(element.repos.length).to.be.greaterThan(0);

    await method({ target: { value: 'timblack1-doesnt-exist' } });
    expect(element.repos.length).to.equal(0);
    // expect(element.errorMessage).to.equal('This username could not be found.')
  });

  it("displays a list of the selected Github user's repositories", async () => {
    const method = element.usernameChanged.bind(element);
    await method({ target: { value: 'timblack1' } });
    const repoList = element.shadowRoot.querySelector('.repo-list');
    expect(repoList.childElementCount).to.be.greaterThan(0);
  });

  it('permits the user to filter the list of displayed repositories', async () => {
    let method = element.usernameChanged.bind(element);
    await method({ target: { value: 'timblack1' } });
    const repoList = element.shadowRoot.querySelector('.repo-list');
    expect(repoList.childElementCount).to.equal(32);

    method = element.filterChanged.bind(element);
    await method({ target: { value: 'angular' } });
    expect(repoList.childElementCount).to.equal(1);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
