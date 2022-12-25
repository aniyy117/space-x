import React from "react";
import { useSelector } from "react-redux";
import styles from "./AddressPage.module.scss";
import { Box } from "@mui/material";
import { useQueryDispatch } from "../../Core/CustomHooks/useQueryDispatch";
import { RootState } from "../../Redux/storeConfigurations";
import { useDocumentTitle } from "../../Core/CustomHooks/useDocumentTitle";
import { getAddress, resetAddress } from "../../Redux/Actions/history.actions";
import { AddressSelectors } from "../../Redux/Reducers/address.reducer";

interface AddressPageProps {}

const AddressPage: React.FC<AddressPageProps> = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const addressData = useSelector(AddressSelectors.selectAll);
  useDocumentTitle("History Page");

  console.log(addressData, "historyData");

  const fetchData = useQueryDispatch({
    query: {
      action: getAddress,
      arg: {},
    },
    cleanup: { action: resetAddress, args: [] },
    dependency: [],
  });

  return (
    <div id="AddressPage" className={styles.container}>
      <Box
        sx={{ height: "calc(100vh - 2rem)", width: "100%", padding: "10px" }}
      >
        <h1>history</h1>
      </Box>
    </div>
  );
};

// ----------------------------------------------------------------------------------

export default AddressPage;
