import React from "react";
import { useSelector } from "react-redux";
import { InstrumentsSelectors } from "../../Redux/Reducers/instrument.reducer";
import styles from "./HistoryPage.module.scss";
import { Box, Typography } from "@mui/material";
import { useQueryDispatch } from "../../Core/CustomHooks/useQueryDispatch";
import { RootState } from "../../Redux/storeConfigurations";
import { useDocumentTitle } from "../../Core/CustomHooks/useDocumentTitle";
import { getHistory, resetHistory } from "../../Redux/Actions/history.actions";
import { HistorySelectors } from "../../Redux/Reducers/history.reducer";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Fade from "@mui/material/Fade";
import moment from "moment";
import { WikipediaIcon } from "../../assets/icons/media/WikipediaIcon";
import { LinkIcon } from "../../assets/icons/media/LinkIcon";
import { RedditIcon } from "../../assets/icons/media/RedditIcon";

interface HistoryPageProps {}

const HistoryPage: React.FC<HistoryPageProps> = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const historyData = useSelector(HistorySelectors.selectAll);
  useDocumentTitle("History Page");

  console.log(historyData, "historyData");

  const fetchData = useQueryDispatch({
    query: {
      action: getHistory,
      arg: {},
    },
    cleanup: { action: resetHistory, args: [] },
    dependency: [],
  });

  return (
    <Box
      sx={{
        height: "calc(100vh - 5rem)",
        width: "100%",
        overflowY: "auto",
      }}
    >
      <Timeline position="alternate">
        {historyData.map((item, index) => {
          return (
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Box
                  sx={{
                    color: theme.darkTheme ? "white" : "black",
                  }}
                >
                  <Fade in={true}>
                    <Typography sx={{ fontWeight: "900" }}>
                      {item.title}
                    </Typography>
                  </Fade>
                  <Fade in={true}>
                    <Typography>
                      {moment(item.event_date_utc).format("llll")}
                    </Typography>
                  </Fade>
                  {item.links && (
                    <Fade in={true}>
                      <Typography sx={{ marginTop: "0.5rem" }}>
                        {item.links.article && (
                          <a
                            href={item.links.article}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <LinkIcon />
                          </a>
                        )}

                        {item.links.wikipedia && (
                          <a
                            href={item.links.wikipedia}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <WikipediaIcon fill="white" />
                          </a>
                        )}

                        {item.links.reddit && (
                          <a
                            href={item.links.reddit}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <RedditIcon fill="white" />
                          </a>
                        )}
                      </Typography>
                    </Fade>
                  )}
                </Box>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Box>
  );
};

// ----------------------------------------------------------------------------------

export default HistoryPage;
