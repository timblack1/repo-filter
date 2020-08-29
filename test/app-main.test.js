import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import '../src/app-main.js';

describe('AppMain', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html` <app-main></app-main> `);
  });

  it('renders an h1', () => {
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

    await method({ target: { value: '' } });
    expect(repoList.childElementCount).to.equal(0);

    method = element.usernameChanged.bind(element);
    await method({ target: { value: 'timblack1' } });
    method = element.filterChanged.bind(element);
    await method({ target: { value: 'angular' } });
    expect(repoList.childElementCount).to.equal(1);

    await method({ target: { value: '' } });
    expect(repoList.childElementCount).to.equal(32);
  });

  it('should start and stop spinning the logo', async () => {
    let method = element.spinLogoStart.bind(element);
    await method();
    expect(element.spinLogo).to.equal(true);
    expect(element.shadowRoot.querySelector('.logo').classList.contains('spin'))
      .to.be.true;

    method = element.spinLogoStop.bind(element);
    await method();
    expect(element.spinLogo).to.equal(false);
    expect(element.shadowRoot.querySelector('.logo').classList.contains('spin'))
      .to.be.false;
  });

  it('permits the user to toggle from light mode to dark mode', async () => {
    const setDarkModeSpy = sinon.spy(element, 'setDarkMode');
    const setLightModeSpy = sinon.spy(element, 'setLightMode');

    element.darkMode = false;
    const method = element.toggleDarkMode.bind(element);
    method();
    expect(element.darkMode).to.equal(true);
    expect(element.classList.contains('dark-mode')).to.be.true;
    expect(element.classList.contains('light-mode')).to.be.false;
    expect(setDarkModeSpy.callCount).to.equal(1);
    expect(setLightModeSpy.callCount).to.equal(0);
  });

  it('permits the user to toggle from dark mode to light mode', async () => {
    const setDarkModeSpy = sinon.spy(element, 'setDarkMode');
    const setLightModeSpy = sinon.spy(element, 'setLightMode');

    element.darkMode = true;
    const method = element.toggleDarkMode.bind(element);
    method();
    expect(element.darkMode).to.equal(false);
    expect(element.classList.contains('dark-mode')).to.be.false;
    expect(element.classList.contains('light-mode')).to.be.true;
    expect(setDarkModeSpy.callCount).to.equal(0);
    expect(setLightModeSpy.callCount).to.equal(1);
  });

  it('permits the user to switch from light mode to dark mode', async () => {
    const setDarkModeSpy = sinon.spy(element, 'setDarkMode');
    const setLightModeSpy = sinon.spy(element, 'setLightMode');

    element.darkMode = false;
    const method = element.toggleDarkMode.bind(element);
    method();
    expect(element.darkMode).to.equal(true);
    expect(element.classList.contains('dark-mode')).to.be.true;
    expect(element.classList.contains('light-mode')).to.be.false;
    expect(setDarkModeSpy.callCount).to.equal(1);
    expect(setLightModeSpy.callCount).to.equal(0);
  });

  it('permits the user to switch from dark mode to light mode', async () => {
    const setDarkModeSpy = sinon.spy(element, 'setDarkMode');
    const setLightModeSpy = sinon.spy(element, 'setLightMode');

    element.darkMode = true;
    const method = element.toggleDarkMode.bind(element);
    method();
    expect(element.darkMode).to.equal(false);
    expect(element.classList.contains('dark-mode')).to.be.false;
    expect(element.classList.contains('light-mode')).to.be.true;
    expect(setDarkModeSpy.callCount).to.equal(0);
    expect(setLightModeSpy.callCount).to.equal(1);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
