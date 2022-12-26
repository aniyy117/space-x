import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useQueryDispatch } from "../../Core/CustomHooks/useQueryDispatch";
import { RootState } from "../../Redux/storeConfigurations";
import { useDocumentTitle } from "../../Core/CustomHooks/useDocumentTitle";
import { getAddress, resetAddress } from "../../Redux/Actions/history.actions";
import { AddressSelectors } from "../../Redux/Reducers/address.reducer";
import LetSuspense from "../../Core/LetSuspense";
import Retry from "../../Core/Retry";
import Loader from "../../ui-componets/Loader";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Pagination from "@mui/material/Pagination";
import Fade from "@mui/material/Fade";
import SearchBar from "../../ui-componets/SearchBar/Searchbar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface AddressPageProps {}

const AddressPage: React.FC<AddressPageProps> = () => {
  const [page, setPage] = React.useState<number>(0);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const pageinatedDate = useSelector((state: RootState) =>
    AddressSelectors.selectFilterData(state, searchQuery)
  );
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  useDocumentTitle("Payload");

  const fetchData = useQueryDispatch({
    query: {
      action: getAddress,
      arg: {},
    },
    cleanup: { action: resetAddress, args: [] },
    dependency: [],
  });

  const handleQueryChange = (query: string) => {
    setPage(0);
    setSearchQuery(query);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 9rem)",
        }}
      >
        {/* search Box */}
        <Box
          sx={{
            width: "100%",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "sticky",
            top: 0,
          }}
          id="searchBox"
        >
          <SearchBar setSearchQuery={handleQueryChange} />
        </Box>
        {/* search Box */}
        {/* card div */}
        <Fade in={true}>
          <Box
            sx={{
              height: "calc(100vh - 14rem)",
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
              {pageinatedDate.length > 0 ? (
                pageinatedDate[page].map((item: any, index: number) => (
                  <Card
                    sx={{
                      minWidth: 200,
                      mt: 3,
                      background: "rgb(177 176 176 / 90%)",
                    }}
                    key={index}
                  >
                    <CardHeader
                      title={item.payload_id}
                      sx={{
                        background: "#000000a6",
                        color: "white",
                      }}
                    />
                    <CardContent
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                      }}
                    >
                      <Box>
                        {/* type */}
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Type
                        </Typography>
                        <Typography variant="h6">
                          {item.payload_type}
                        </Typography>
                        {/* type */}
                        {/* CUSTOMER */}
                        <Typography
                          sx={{ fontSize: 14, mt: 2 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          CUSTOMER
                        </Typography>
                        <Typography variant="h6">{item.customers}</Typography>
                        {/* CUSTOMER */}
                      </Box>
                      {/* 2nd */}
                      <Box>
                        {/* mass */}
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          MASS
                        </Typography>
                        <Typography variant="h6">
                          {item.payload_mass_kg != "0"
                            ? `${item.payload_mass_kg} kg`
                            : "-"}
                        </Typography>
                        {/* mass */}
                        {/* orbit */}
                        <Typography
                          sx={{ fontSize: 14, mt: 2 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          ORBIT
                        </Typography>
                        <Typography variant="h6">{item.orbit}</Typography>
                        {/* orbit */}
                      </Box>
                      {/* third */}
                      <Box>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Nationality
                        </Typography>
                        <Typography variant="h6">{item.nationality}</Typography>
                        {/* orbit */}
                        <Typography
                          sx={{ fontSize: 14, mt: 2 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          ORBIT
                        </Typography>
                        <Typography variant="h6">
                          {item.manufacturer}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", color: "white" }}
                >
                  No Data Found
                </Typography>
              )}
            </LetSuspense>
          </Box>
        </Fade>

        <Box
          sx={{
            width: "100%",
            marginTop: "7px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {pageinatedDate.length > 1 && (
            <Pagination
              color="secondary"
              count={pageinatedDate.length - 1}
              size={matches ? "large" : "small"}
              onChange={(event: React.ChangeEvent<unknown>, page: number) =>
                setPage(page - 1)
              }
            />
          )}
        </Box>
      </Box>
    </>
  );
};

// ----------------------------------------------------------------------------------

export default AddressPage;
