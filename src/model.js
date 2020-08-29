import { config } from '../.env-config.js';

const model = {
  /**
   * Methods for managing repositories
   */
  repositories: {
    /**
     * Get repositories by username
     *
     * @param { string } username The Github username whose repositories you want to get
     */
    getByUsername: async username => {
      const gqlData = await window
        .fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            Authorization: `bearer ${config.githubPersonalAccessToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query: `
          query {
            user(login:"${username}") {
              repositories(first:100,orderBy:{field:NAME,direction:ASC}) {
                edges {
                  node {
                    description
                    resourcePath
                    name
                    updatedAt
                  }
                }
              }
            }
          }
        `,
          }),
        })
        .then(model.handleErrors)
        .then(response => response.json())
        // Note: eslint doesn't like console statements
        .catch(console.error);

      return gqlData;
    },
  },

  /**
   * Handle errors thrown by fetch() calls
   *
   * @static
   * @param { object } response
   * @returns { object } Returns a rejected promise if there is an error; else returns the response
   * @memberof AppMain
   */
  handleErrors: response => {
    if (!response.ok) {
      // throw Error(response.statusText)
      return Promise.reject(response);
    }
    return response;
  },
};

export { model };
