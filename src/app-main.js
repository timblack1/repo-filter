import { LitElement, html, css } from 'lit-element';
import { openWcLogo } from './open-wc-logo.js';
import '../node_modules/@polymer/paper-input/paper-input.js';
import './repo-view.js';
import { model } from './model.js';

export class AppMain extends LitElement {
  static get properties() {
    return {
      /**
       * The Github username whose repos we want to display
       */
      username: { type: String },
      /**
       * A string by which to filter the repositories by name
       */
      filter: { type: String },
      /**
       * Repos associated with the currently-selected Github username
       */
      repos: { type: Array },
      /**
       * Error message to display to the user
       */
      errorMessage: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        --heading-font-size: calc(10px + 2vmin);
        --body-font-size: calc(10px + 0.75vmin);
        --footer-font-size: calc(12px + 0.5vmin);
        --purple: #9b00ff;
        --blue: #0077ff;
        --strong-contrast-background-color: #ac42f8;
        --light-contrast-background-color: #ecf3fc;
        --repo-hover-color: white;
        --repo-hover-bgcolor: #972de2;
        --transition-duration: 0.2s;

        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: var(--heading-font-size);
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

      .error-message {
        color: red;
      }

      .app-footer {
        font-size: var(--footer-font-size);
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
    this.errorMessage = '';
    this.filter = '';
  }

  render() {
    return html`
      <main>
        <div class="logo">${openWcLogo}</div>
        <h1>Repo Filter</h1>

        <paper-input
          class="username"
          label="Enter a Github user name"
          autofocus
          @input="${this.usernameChanged}"
        ></paper-input>

        <paper-input
          class="filter"
          label="Filter this user's repos for..."
          @input="${this.filterChanged}"
        ></paper-input>

        <p class="error-message">${this.errorMessage}</p>

        <div class="repo-list">
          ${this.repos
            .filter(repo => {
              return this.filter === ''
                ? // Display all repos
                  true
                : // Display only the repos for which the user searched
                  repo.name.indexOf(this.filter) !== -1;
            })
            .map(repo => html` <repo-view .repo="${repo}"></repo-view> `)}
        </div>
      </main>

      <p class="app-footer">
        Made for an interview by
        <a href="https://www.linkedin.com/in/timblack11/">Tim Black</a>. Code at
        <a href="https://github.com/timblack1/repo-filter">Github</a>.
      </p>
    `;
  }

  /**
   * Username changed event handler
   *
   * @param { object } event
   * @memberof AppMain
   */
  async usernameChanged(event) {
    this.errorMessage = '';
    const gqlData = await model.repositories.getByUsername(event.target.value);
    if (typeof gqlData.errors === 'undefined') {
      this.repos = gqlData.data.user.repositories.edges.map(edge => edge.node);
    } else {
      // TODO: This works if the user types slowly, but if the user types quickly, it still displays the error message
      // this.errorMessage = 'This username could not be found.'
      this.repos = [];
    }
  }

  /**
   * Filter changed event handler
   *
   * @param { object } event
   * @memberof AppMain
   */
  filterChanged(event) {
    this.filter = event.target.value;
  }
}

window.customElements.define('app-main', AppMain);
