import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getInstruments,
  resetInstrument,
} from "../../Redux/Actions/instrument.action";
import { InstrumentsSelectors } from "../../Redux/Reducers/instrument.reducer";
import styles from "./StocksPage.module.scss";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useQueryDispatch } from "../../Core/CustomHooks/useQueryDispatch";
import LetSuspense from "../../Core/LetSuspense";
import Retry from "../../Core/Retry";
import Loader from "../../ui-componets/Loader";
import Crumbs from "../../Core/Crumbs";
import { RootState } from "../../Redux/storeConfigurations";
import { useDocumentTitle } from "../../Core/CustomHooks/useDocumentTitle";

interface StocksPageProps {}

const StocksPage: React.FC<StocksPageProps> = () => {
  const instruments = useSelector(InstrumentsSelectors.selectAll);
  const theme = useSelector((state: RootState) => state.theme);
  useDocumentTitle("Stocks Page");
  const columns: GridColDef[] = [
    // {
    //   field: "id",
    //   headerName: "SNo.",
    //   width: 100,
    //   editable: false,
    // },
    {
      field: "Name",
      headerName: "Name",
      width: 400,
      editable: false,
    },
    {
      field: "Sector",
      headerName: "Sector",
      width: 400,
      editable: false,
      renderCell: (params) => (
        <span>{params.row.Sector ? params.row.Sector : "-"}</span>
      ),
    },
    {
      field: "Symbol",
      headerName: "Symbol",
      width: 400,
      editable: false,
      renderCell: (params) => (
        <NavLink
          to={`/quotes/${params.row.Symbol}`}
          className={theme.darkTheme ? styles.navlink : styles.navlink_dark}
        >
          {params.row.Symbol}
        </NavLink>
      ),
    },
  ];

  const breadCrumbs = [
    {
      underline: "hover",
      href: "#",
      name: "Home",
    },
  ];

  const fetchData = useQueryDispatch({
    query: {
      action: getInstruments,
      arg: {},
    },
    cleanup: { action: resetInstrument, args: [] },
    dependency: [],
  });

  return (
    <div id="StocksPage" className={styles.container}>
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
            rows={instruments}
            columns={columns}
            pageSize={instruments.length}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            components={{ Toolbar: GridToolbar }}
            density="compact"
            getRowClassName={(params) =>
              theme.darkTheme
                ? params.indexRelativeToCurrentPage % 2 === 0
                  ? styles.even
                  : styles.odd
                : params.indexRelativeToCurrentPage % 2 === 0
                ? styles.even_dark
                : styles.odd_dark
            }
            hideFooter
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                
              },
            }}
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

export default StocksPage;
