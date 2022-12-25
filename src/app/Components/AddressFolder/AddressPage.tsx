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

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Pagination from "@mui/material/Pagination";
import Fade from "@mui/material/Fade";

interface AddressPageProps {}

const AddressPage: React.FC<AddressPageProps> = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const addressData = useSelector(AddressSelectors.selectFilterderKeys);
  const pageinatedDate = useSelector(AddressSelectors.selectDataForPagination);
  const [page, setPage] = React.useState(1);

  console.log(pageinatedDate);

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
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "sticky",
            top: 0,
            background: "rgb(177 176 176 / 50%)",
          }}
        >
          <Pagination
            count={pageinatedDate.length - 1}
            size="large"
            onChange={(event: React.ChangeEvent<unknown>, page: number) =>
              setPage(page)
            }
          />
        </Box>
        <Fade in={true}>
          <Box
            sx={{
              height: "calc(100vh - 13rem)",
              width: "100%",
              padding: "10px",
              overflow: "auto",
            }}
          >
            <LetSuspense
              condition={fetchData.match("TRUE")}
              errorCondition={fetchData.match("ERROR")}
              errorPlaceholder={<Retry onClick={fetchData.fetch} />}
              loadingPlaceholder={Loader}
            >
              {pageinatedDate.length > 0 &&
                pageinatedDate[page].map((item: any, index: number) => (
                  <Card
                    sx={{
                      minWidth: 200,
                      mt: 3,
                      background: "rgb(177 176 176 / 50%)",
                    }}
                  >
                    <CardHeader
                      title={item.payload_id}
                      sx={{
                        background: "#000000a6",
                        color: "white",
                      }}
                    />
                    <CardContent
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      <Box>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Type
                        </Typography>
                        <Typography variant="h6">djdjdjj</Typography>

                        <Typography
                          sx={{ fontSize: 14, mt: 2 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          CUSTOMER
                        </Typography>
                        <Typography variant="h6">djdjdjj</Typography>
                      </Box>
                      {/* mass */}
                      <Box>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          MASS
                        </Typography>
                        <Typography variant="h6">djdjdjj</Typography>
                        {/* orbit */}
                        <Typography
                          sx={{ fontSize: 14, mt: 2 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          ORBIT
                        </Typography>
                        <Typography variant="h6">djdjdjj</Typography>
                      </Box>
                      {/* third */}
                      <Box>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          MASS
                        </Typography>
                        <Typography variant="h6">djdjdjj</Typography>
                        {/* orbit */}
                        <Typography
                          sx={{ fontSize: 14, mt: 2 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          ORBIT
                        </Typography>
                        <Typography variant="h6">djdjdjj</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
            </LetSuspense>
          </Box>
        </Fade>
      </Box>
      <Box
        sx={{
          width: "100%",
          margin: "7px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={pageinatedDate.length - 1}
          size="large"
          onChange={(event: React.ChangeEvent<unknown>, page: number) =>
            setPage(page)
          }
        />
      </Box>
    </>
  );
};

// ----------------------------------------------------------------------------------

export default AddressPage;
