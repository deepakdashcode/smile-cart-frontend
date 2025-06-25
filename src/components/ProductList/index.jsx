import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { PageLoader, Header } from "components/common";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.fetch({ searchTerm: searchKey });
        setProducts(data.products);
        console.log("after set prod");
      } catch (error) {
        console.log("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [searchKey]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col">
      <Header
        shouldShowBackButton={false}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={event => setSearchKey(event.target.value)}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
