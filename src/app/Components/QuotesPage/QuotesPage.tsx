import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { useQueryDispatch } from "../../Core/CustomHooks/useQueryDispatch";
import { getQuotes } from "../../Redux/Actions/quotes.action";
import { QuotesSelectors } from "../../Redux/Reducers/quotes.reducer";
import styles from "./QuotesPage.module.scss";
import moment from "moment";
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Crumbs from "../../Core/Crumbs";
import { RootState } from "../../Redux/storeConfigurations";
import { numberFormat } from "../../ui-componets/utils/valueFormat";
import { useDocumentTitle } from "../../Core/CustomHooks/useDocumentTitle";
import { useQueryDispatch } from "../../Core/CustomHooks/useQueryDispatch";
import LetSuspense from "../../Core/LetSuspense";
import Retry from "../../Core/Retry";
import Loader from "../../ui-componets/Loader";

interface QuotesPageProps {}
interface Params {
  symbol: string;
}

const columns: GridColDef[] = [
  {
    field: "price",
    headerName: "Price",
    width: 400,
    editable: false,
    cellClassName: styles.col,
    renderCell: (params) => {
      return <span>{numberFormat(params.row.price)}</span>;
    },
  },
  {
    field: "time",
    headerName: "Time",
    width: 400,
    editable: false,
    type: "date",
    cellClassName: styles.col,
    valueFormatter: (params: GridValueFormatterParams) => {
      return moment(params.value).format("YYYY-MM-DD HH:mm:ss");
    },
    valueGetter: (params: GridValueGetterParams) => {
      return moment(params.value).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    field: "valid_till",
    headerName: "Valid Till",
    width: 400,
    editable: false,
    type: "date",
    cellClassName: styles.col,
    valueFormatter: (params: GridValueFormatterParams) => {
      return moment(params.value).format("YYYY-MM-DD HH:mm:ss");
    },
    valueGetter: (params: GridValueGetterParams) => {
      return moment(params.value).format("YYYY-MM-DD HH:mm:ss");
    },
  },
];

const QuotesPage: React.FC<QuotesPageProps> = () => {
  const { symbol } = useParams<Params>();
  const [count, setCount] = React.useState<any>(0);
  const quotes = useSelector(QuotesSelectors.selectSortData);
  const valid_date = useSelector(QuotesSelectors.selectAllValidDate);
  useDocumentTitle("Quotes Page");
  const theme = useSelector((state: RootState) => state.theme);
  const breadCrumbs = [
    {
      underline: "hover",
      href: "#/",
      name: "Home",
    },
    {
      underline: "none",
      href: "",
      name: symbol,
    },
  ];

  const fetchData = useQueryDispatch({
    query: {
      action: getQuotes,
      arg: { symbol },
    },
    dependency: [count, symbol],
  });

  React.useEffect(() => {
    //eslint-disable-next-line
    if (count == valid_date.length - 1) {
      setCount(0);
    }
    const currentTime = () => {
      if (valid_date.length === 0) return;

      if (fetchData.match("FETCHING")) return;

      let maxDate: any = valid_date[count];

      const max_date = moment(maxDate)
        .add(10 + count * 10, "seconds")
        .format("YYYY-MM-DD HH:mm:ss");
      const currentTime = moment.utc().format("YYYY-MM-DD HH:mm:ss");

      //eslint-disable-next-line
      if (max_date == currentTime) {
        setCount(count + 1);
      }
    };
    const interval = setInterval(() => currentTime(), 1000);

    return () => clearInterval(interval);
  }, [count, valid_date, fetchData]);

  return (
    <div id="QuotesPage" className={styles.container}>
      <Box
        sx={{ height: "calc(100vh - 2rem)", width: "100%", padding: "10px" }}
      >
        <Crumbs breadcrumbData={breadCrumbs} />
        <LetSuspense
          condition={fetchData.match("TRUE")}
          errorCondition={fetchData.match("ERROR")}
          errorPlaceholder={<Retry onClick={fetchData.fetch} />}
          loadingPlaceholder={Loader}
        >
          <DataGrid
            rows={quotes}
            columns={columns}
            pageSize={quotes.length}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            density="compact"
            hideFooter
            getRowClassName={(params) =>
              theme.darkTheme
                ? params.indexRelativeToCurrentPage % 2 === 0
                  ? styles.even
                  : styles.odd
                : params.indexRelativeToCurrentPage % 2 === 0
                ? styles.even_dark
                : styles.odd_dark
            }
            sx={{
              boxShadow: 2,
            }}
          />
        </LetSuspense>
      </Box>
    </div>
  );
};

// ----------------------------------------------------------------------------------

export default QuotesPage;
