import {useLoaderData, Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

export function meta() {
  return [
    {title: 'Hydrogen'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export async function loader({context}) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index() {
  const {products} = useLoaderData();
  return (
    <section className="w-full gap-4 container mx-auto">
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead">
        Collections
      </h2>
      <div className="mt-8 grid gap-y-12 gap-x-8 grid-cols-fluid">
        {products.nodes.map((product) => {
          //   console.log(product.images.nodes[0].url);
          console.log(product.handle);
          return (
            <Link to={`/products/${product.handle}`} key={product.id}>
              <div className="card w-96 bg-base-100 shadow-xl">
                {product?.images && (
                  <Image
                    alt={`Image of ${product.title}`}
                    src={product.images.nodes[0].url}
                    sizes="(max-width: 32em) 100vw, 33vw"
                    // aspectRatio="4/5"
                  />
                )}
                <div className="card-body">
                  <h2 className="card-title">{product.title}</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    products(first: 3) {
      nodes {
        id
        title
        handle
        images(first:10) {
            nodes {
              url
            }
          }
      }
    }
  }
`;
