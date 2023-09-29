import {
  ReactChild,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import ReactPaginate from "react-paginate";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";

interface PaginationProps {
  children:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  length: number;
  scrollRef?: any;
  forceFirstPage?: boolean;
  api?: boolean;
  setLocalFilter?: (filter: { rangeFrom: number; rangeTo: number }) => void;
}
const Pagination = observer(({ children, length, scrollRef, forceFirstPage }: PaginationProps) => {
    const { setFilter, clearFilter } = useInjection(UserStore);
    const [page, setPage] = useState(0);
    const pageLength = 8;
    const handlePageClick = (p: { selected: number }) => {
      setPage(p.selected);
      if (scrollRef?.current) {
        scrollRef?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
      const prevOffset = p.selected * pageLength;
      const newOffset = (p.selected + 1) * pageLength;

      setFilter({ rangeFrom: prevOffset, rangeTo: newOffset });
    };
    useEffect(() => {
      return () => {
        setPage(0);
        clearFilter();
      };
    }, []);

    useEffect(() => {
      if (forceFirstPage) {
        console.log("FIRST PAGE");
        setPage(0);
        clearFilter();
      }
    }, [forceFirstPage]);
    return (
      <div className="pagination">
        {children}
        {length > pageLength && (
          /* @ts-ignore */
          <ReactPaginate
            breakLabel="..."
            activeClassName="pagination--selected"
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={Math.ceil(length / pageLength)}
            previousLabel="<"
            className="pagination--list"
            forcePage={page}
          />
        )}
      </div>
    );
  }
);
export default Pagination;
