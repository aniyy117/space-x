import React from "react";
import { useSelector } from "react-redux";
import styles from "./AddressPage.module.scss";
import { Box } from "@mui/material";
import { useQueryDispatch } from "../../Core/CustomHooks/useQueryDispatch";
import { RootState } from "../../Redux/storeConfigurations";
import { useDocumentTitle } from "../../Core/CustomHooks/useDocumentTitle";
import { getAddress, resetAddress } from "../../Redux/Actions/history.actions";
import { AddressSelectors } from "../../Redux/Reducers/address.reducer";
import LetSuspense from "../../Core/LetSuspense";
import Retry from "../../Core/Retry";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Loader from "../../ui-componets/Loader";

interface AddressPageProps {}

const AddressPage: React.FC<AddressPageProps> = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const addressData = useSelector(AddressSelectors.selectFilterderKeys);
  useDocumentTitle("Payload");

  const handleCol = (data: any) => {
    if (data.length === 0) return [];
    const columns: any = Object.keys(data[0]).map(
      (item: any, index: number) => {
        return {
          field: item,
          headerName: item,
          width: 200,
          editable: false,
          // cellClassName: styles.col,
          // renderCell: (params) => {
          //   return <span>{numberFormat(params.row.price)}</span>;
          // },
        };
      }
    );

    return columns;
  };

  const fetchData = useQueryDispatch({
    query: {
      action: getAddress,
      arg: {},
    },
    cleanup: { action: resetAddress, args: [] },
    dependency: [],
  });

  return (
    <Box sx={{ height: "calc(100vh - 6rem)", width: "100%", padding: "10px" }}>
      <LetSuspense
        condition={fetchData.match("TRUE")}
        errorCondition={fetchData.match("ERROR")}
        errorPlaceholder={<Retry onClick={fetchData.fetch} />}
        loadingPlaceholder={Loader}
      >
        <DataGrid
          rows={addressData}
          columns={handleCol(addressData)}
          pageSize={30}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          components={{ Toolbar: GridToolbar }}
          // density="compact"
          getRowClassName={(params) =>
            theme.darkTheme
              ? params.indexRelativeToCurrentPage % 2 === 0
                ? styles.even
                : styles.odd
              : params.indexRelativeToCurrentPage % 2 === 0
              ? styles.even_dark
              : styles.odd_dark
          }
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
  );
};

// ----------------------------------------------------------------------------------

export default AddressPage;
