import { LitElement, html, css } from 'lit-element';
import { openWcLogo } from './open-wc-logo.js';
import '../node_modules/@polymer/paper-input/paper-input.js';
import { config } from '../.env-config.js';

export class AppMain extends LitElement {
  static get properties() {
    return {
      /**
       * The Github username whose repos we want to display
       */
      username: { type: String },
      /**
       * Repos associated with the currently-selected Github username
       */
      repos: { type: Array },
      page: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }

      main {
        flex-grow: 1;
      }

      .logo > svg {
        margin-top: 36px;
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      paper-input {
        font-size: initial;
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.repos = [];
  }

  render() {
    return html`
      <main>
        <div class="logo">${openWcLogo}</div>
        <h1>Repo Filter</h1>

        <paper-input
          class="username"
          label="Enter a Github user name"
          @input="${this.usernameChanged}"
        ></paper-input>

        <paper-input
          class="filter"
          label="Filter this user's repos for..."
        ></paper-input>

        <div class="repo-list">
          ${this.repos.map(
            repo => html` <repo-view .repo="${repo}"></repo-view> `
          )}
        </div>
      </main>

      <p class="app-footer">
        Made for fun by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/timblack11/"
          >Tim Black</a
        >.
      </p>
    `;
  }

  /**
   * Username changed event handler
   *
   * @param { object } event
   * @memberof AppMain
   */
  usernameChanged(event) {
    // TODO: Start here.  Get the user's repos
    this.token = config.githubPersonalAccessToken;
    this.tmp = event;
  }
}

customElements.define('app-main', AppMain);
