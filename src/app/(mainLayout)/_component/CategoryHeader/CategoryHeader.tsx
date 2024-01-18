"use client";
import productAPI from "@/apis/product/productAPIService";
import { useQuery } from "@tanstack/react-query";
import style from "@/app/(mainLayout)/_component/CategoryHeader/CategoryHeader.module.css";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function CategoryHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: category } = useQuery({
    queryKey: ["product", "category"],
    queryFn: () => productAPI.getCategories(),
  });

  return (
    <div className={style.categories}>
      {category?.data.map((cate) => (
        <div
          className={style.cate}
          key={cate.value}
          role="presentation"
          style={{
            backgroundColor: pathname.startsWith(`/category/${cate.value}`)
              ? "#ffa1a1"
              : "#c0c0c0",
          }}
          onClick={() => router.push(`/category/${cate.value}`)}
        >
          {cate.label}
        </div>
      ))}
    </div>
  );
}
