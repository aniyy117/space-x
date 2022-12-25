import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./app.css";
import { ToastContainer } from "react-toastify";
import { RootState, storeConfig } from "./app/Redux/storeConfigurations";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "./theme/theme";
import HistoryPage from "./app/Components/History/HistoryPage";
import AddressPage from "./app/Components/AddressFolder/AddressPage";
import NavBar from "./app/ui-componets/NavBar/NavBar";

const QuotesPage = React.lazy(
  () => import("./app/Components/QuotesPage/QuotesPage")
);

export const store = storeConfig();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

function AppRouter() {
  const theme = useSelector((state: RootState) => state.theme);

  const dispatch = useAppDispatch();

  return (
    <>
      <ThemeProvider theme={theme.darkTheme ? lightTheme : darkTheme}>
        <div className="container">
          <CssBaseline enableColorScheme />
          <HashRouter>
            <div className="content">
              <NavBar />
              <main className="main">
                <Suspense fallback={<CircularProgress />}>
                  <ToastContainer className="unselectable" />
                  <Switch>
                    <Route path="/" component={HistoryPage} exact={true} />
                    <Route
                      path="/payload"
                      component={AddressPage}
                      exact={true}
                    />
                    <Redirect to="/" />
                  </Switch>
                </Suspense>
              </main>
            </div>
          </HashRouter>
          {/* 
           
          </HashRouter> */}
        </div>
      </ThemeProvider>
    </>
  );
}

export default AppRouter;
