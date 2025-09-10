import { useLocale } from 'next-intl';
import SearchInput from "../../search/input";

const SearchFilter = () => {
  const locale = useLocale();
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const hostLang = host + (locale == "fa" ? "" : "/" + locale);

  return (
    <div className="size-full flex items-center justify-center">
      <SearchInput defaultText={''} url={hostLang + "/search/{text}"} />
    </div>
  );
};

export default SearchFilter;
