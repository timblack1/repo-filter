import { expect } from '@open-wc/testing';

import { model } from '../src/model.js';

describe('model', () => {
  beforeEach(async () => {});

  it('handles fetch errors', () => {
    const method = model.handleErrors;
    expect(method).to.exist;
    let done = method({ ok: true });
    expect(done.ok).to.equal(true);
    done = method({ ok: false });
    expect(done.ok).to.not.exist;
  });
});
