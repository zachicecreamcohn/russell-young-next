import React, { useEffect, useState } from "react";
import Body from "@/components/Body/Body";
import Series from "@/components/SeriesListing/Series/Series";
import SeriesFilters from "@/components/SeriesFilters/SeriesFilters";
import { CircularProgress } from "@mui/material";
import $ from "jquery";
import SearchableSeriesList from "@/components/SearchableSeriesList/SearchableSeriesList";
import ToTopOfPageButton from "@/components/ToTopOfPageButton/ToTopOfPageButton";
import ChildWorkPopup from "@/components/popups/ChildWorkPopup/ChildWorkPopup";
import styles from "./series.module.css";
import { checkLogin } from "@/common/util/auth";

function SeriesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const defaultSeries = "FAME"; // default series to display on load

  const [loading, setLoading] = useState(true);
  const [initiallyLoading, setInitiallyLoading] = useState(true);
  const [seriesList, setSeriesList] = useState([]);
  const [seriesInfo, setSeriesInfo] = useState([]);
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [hideSoldOut, setHideSoldOut] = useState(false);

  const [searchQuery, setSearchQuery] = useState({});

  useEffect(() => {
    checkLogin()
      .then((loggedIn) => {
        if (!loggedIn && window.location.pathname !== "/login") {
          window.location.href = "/login";
        } else {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    let lastUpdatedDatetime = getLastUpdatedDatetime();

    setLoading(true);

    fetch("/api/series/getAllSeriesSummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastUpdatedDatetime: lastUpdatedDatetime,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.newInfo) {
          localStorage.setItem("lastUpdatedDatetime", data.lastUpdatedDatetime);
          localStorage.setItem("seriesInfo", JSON.stringify(data.series_names));
        } else {
          data.series_names = JSON.parse(localStorage.getItem("seriesInfo"));
        }

        if (data.series_names === undefined || data.series_names.length === 0) {
          setSeriesList([]);
          setSeriesOptions([]);
          setSeriesInfo([]);
          setLoading(false);
          return;
        }
        let series_names = [];
        for (let i = 0; i < data.series_names.length; i++) {
          series_names.push(data.series_names[i].series);
        }

        if (initiallyLoading) {
          setSeriesList([defaultSeries]);
          setInitiallyLoading(false);
        } else {
          setSeriesList(series_names);
        }

        setSeriesOptions(series_names);
        setSeriesInfo(data.series_names);
        setLoading(false);
      });
  }, [searchQuery]);

  // on page load, check if the url has ?childID in it. If it does, render that popup
  const [childIDInURL, setChildIDInURL] = useState("");
  const [childIDPopupOpen, setChildIDPopupOpen] = useState(false);
  useEffect(() => {
    if (window.location.href.includes("?childID=")) {
      console.log("childID in URL");
      console.log(window.location.href.split("?childID=")[1]);
      let childID = window.location.href.split("?childID=")[1];
      setChildIDInURL(childID);
      setChildIDPopupOpen(true);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <Body center h-80>
        <CircularProgress
          sx={{
            color: "#000000",
          }}
        />
      </Body>
    );
  }


  function toggleCollapseAll() {
    setAllCollapsed((prevValue) => !prevValue);
    if (!allCollapsed) {
      $(".series-collapsable").addClass("collapsed");
    } else {
      $(".series-collapsable").removeClass("collapsed");
    }
  }

  function getLastUpdatedDatetime() {
    // check local storage for last updated datetime
    let localDatetime = localStorage.getItem("lastUpdatedDatetime");
    if (localDatetime) {
      // ensure that htere is a value in local storage
      let localSeriesInfo = localStorage.getItem("seriesInfo");
      if (localSeriesInfo) {
        return localDatetime;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  return (
    <Body center direction="column" Tabs={true} activeTab="series">
      <SeriesFilters
        defaultSeries={defaultSeries}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        seriesOptions={seriesOptions}
        setSeriesOptions={setSeriesOptions}
        seriesList={seriesList}
        setSeriesList={setSeriesList}
        seriesInfo={seriesInfo}
        setSeriesInfo={setSeriesInfo}
        startYear={startYear}
        setStartYear={setStartYear}
        endYear={endYear}
        setEndYear={setEndYear}
        hideSoldOut={hideSoldOut}
        setHideSoldOut={setHideSoldOut}
      />
      <SearchableSeriesList
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        loading={loading}
        seriesList={seriesList}
        seriesInfo={seriesInfo}
        allCollapsed={allCollapsed}
        toggleCollapseAll={toggleCollapseAll}
        hideSoldOut={hideSoldOut}
        setHideSoldOut={setHideSoldOut}
      />

      {childIDInURL !== "" && childIDPopupOpen && (
        <ChildWorkPopup
          id={childIDInURL}
          closePopup={() => setChildIDPopupOpen(false)}
        />
      )}

      <ToTopOfPageButton />
    </Body>
  );
}

export default SeriesPage;
