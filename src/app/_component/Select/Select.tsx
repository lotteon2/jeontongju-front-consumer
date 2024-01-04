import style from "@/app/_component/Select/Select.module.css";
type Props = {
  options: { value: string; label: string }[];
  value: string;
  setValue: (e: any) => void;
};
export default function Select({ options, value, setValue }: Props) {
  return (
    <select className={style.select} onChange={setValue} value={value}>
      {options.map((prop) => (
        <option className={style.option} key={prop.value} value={prop.value}>
          {prop.label}
        </option>
      ))}
    </select>
  );
}
