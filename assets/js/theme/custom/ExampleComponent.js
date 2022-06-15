import React from 'react';

const gqlQuery = `
query getSomeProducts {
    site {
        products (first: 25) {
            edges {
                node {
                    entityId
                    name
                }
            }
        }
    }
}`;

export const ExampleComponent = ({ gqlToken }) => {
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        // On component mount, make the GraphQL request
        fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${gqlToken}`,
            },
            body: JSON.stringify({ query: gqlQuery }),
        })
        .then(res => res.json())
        .then(json => {
            const productsArray = json.data.site.products.edges;
            const productNames = productsArray.map(product => product.node.name);
            setProducts(productNames);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h3>This is an example React Component to display some GraphQL stuff</h3>
            <hr />
            {products.map((product, index) => (
                <div key={`product-${index}`}>{product}</div>
            ))}
        </div>
    );
};
