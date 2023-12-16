import searchAPI from "@/apis/search/searchAPIService";

async function getProductData(productId: string) {
  const { data } = await searchAPI.getProductDetailByProductId(
    productId as string
  );
  return {
    data,
  };
}

type Props = {
  params: { productId: string };
};

export default async function Page({ params }: Props) {
  const { productId } = params;
  // console.log(data);
  const data = await getProductData(productId);
  console.log(data);
  return <div>PRODUCT </div>;
}
