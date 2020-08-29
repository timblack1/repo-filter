import { html, fixture, expect } from '@open-wc/testing';

import '../src/repo-view.js';

describe('RepoView', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html` <repo-view></repo-view> `);
    element.repo = {
      resourcePath: '/timblack1/repo-filter',
      name: 'repo-filter',
      description: "Display and filter a Github user's list of repositories",
    };
  });

  it('renders an anchor tag', () => {
    const anchor = element.shadowRoot.querySelector('a');
    expect(anchor).to.exist;
    expect(anchor.href).to.equal(
      `https://github.com${element.repo.resourcePath}`
    );
    expect(anchor.textContent).to.equal(element.repo.name);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
