import React from 'react';
import { createRoot } from 'react-dom/client';
import PageManager from '../page-manager';
import { ExampleComponent } from './ExampleComponent';

export default class ReactExample extends PageManager {
    constructor(context) {
        // The PageManager class will automatically inherit the jsContext, which will
        // contain the GraphQL token that was injected in from the page.
        super(context);

        // Destructure the GraphQL token and pass it to the react component as a prop
        const { graphQLToken } = this.context;
        this.graphQLToken = graphQLToken;
    }

    onReady() {
        const container = document.getElementById('react-root');
        const root = createRoot(container);
        root.render(<ExampleComponent gqlToken={this.graphQLToken} />);
    }
}
