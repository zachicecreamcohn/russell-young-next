import React from "react";
import { useState, useEffect } from "react";
import {
  Search as SearchIcon,
  ColorPicker,
  ColorFilter,
} from "tabler-icons-react";

import { TextField, Button, Box } from "@mui/material";

// import styles
import styles from "./Search.module.css";
import { CookieSharp } from "@mui/icons-material";

function Search(props) {
  // define a state variable to hold the passed in state of searchQuery

  const [searchable, setSearchable] = useState(false);

  const seriesOptions = props.seriesOptions;
  const setSeriesOptions = props.setSeriesOptions;

  const seriesList = props.seriesList;
  const setSeriesList = props.setSeriesList;

  const seriesInfo = props.seriesInfo;
  const setSeriesInfo = props.setSeriesInfo;

  // // handle changes in props.searchQuery
  // React.useEffect(() => {
  //     props.setSearchQuery(props.searchQuery);
  // }
  // , [props.searchQuery]);

  function resetSeriesList() {
    //TODO: add in loading animation

    // get seriesInfo from localStorage
    let seriesInfo = JSON.parse(localStorage.getItem("seriesInfo"));

    let series_names = [];
    for (let i = 0; i < seriesInfo.length; i++) {
      series_names.push(seriesInfo[i].series);
    }

    setSeriesOptions(series_names);
    setSeriesInfo(seriesInfo);
  }

  function getKeywordsFromQuery(query) {
    const keywords = [];
    let words = query.match(/"[^"]*"|'[^']*'|\S+/g) || [];
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.match(/^\d{4}$/)) {
        // Year (YYYY)
        continue;
      } else if (word.startsWith('"') || word.startsWith("'")) {
        // Quoted phrase
        keywords.push(word.slice(1, -1));
      } else {
        // Non-quoted word
        let temp = "";
        for (let j = i; j < words.length; j++) {
          temp += words[j] + " ";
          keywords.push(temp.trim());
        }
      }
    }
    return keywords;
  }

  function getQuotedSegments(str) {
    const regex = /"([^"]+)"/g;
    const matches = str.match(regex);
    if (matches) {
      return matches.map((match) => match.slice(1, -1));
    } else {
      return [];
    }
  }

  function getYearsFromQuery(query) {
    const years = [];
    let words = query.match(/"[^"]*"|'[^']*'|\S+/g) || [];
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.match(/^\d{4}$/)) {
        // Year (YYYY)
        years.push(word);
      }
    }
    return years;
  }

  function searchByContent(contentKeywords, quotedKeywords, yearKeywords) {
    let seriesInfo = JSON.parse(localStorage.getItem("seriesInfo"));

    let matchesSeries = []; // list of series objects with matching content somewhere in the series
    for (let i = 0; i < seriesInfo.length; i++) {
      let series = seriesInfo[i];

      let parentWorks = series.parentWorks;
      let matchingParentWorks = []; // list of parent works with matching content somewhere in the parent work
      for (let j = 0; j < parentWorks.length; j++) {
        let thisParentMatches = false;
        let parentWork = parentWorks[j];

        const title = parentWork.title;
        const medium = parentWork.medium;
        const size = parentWork.size;
        const year = parentWork.year;

        // check if any of the content keywords match a word in the title, or medium
        for (let k = 0; k < contentKeywords.length; k++) {
          let contentKeyword = contentKeywords[k];
          if (
            title.toLowerCase().includes(contentKeyword.toLowerCase()) ||
            medium.toLowerCase().includes(contentKeyword.toLowerCase()) ||
            size.toLowerCase().includes(contentKeyword.toLowerCase())
          ) {
            thisParentMatches = true;
            break;
          }
        }

        // if there are quoted keywords, check if the title or medium matches the quoted keywords exactly. If an exact match isn't found, then this parent work doesn't match
        if (quotedKeywords.length > 0) {
          let titleMatches = false;
          let mediumMatches = false;
          let sizeMatches = false;
          for (let k = 0; k < quotedKeywords.length; k++) {
            let quotedKeyword = quotedKeywords[k];
            if (title.toLowerCase().includes(quotedKeyword.toLowerCase())) {
              titleMatches = true;
            }
            if (medium.toLowerCase().includes(quotedKeyword.toLowerCase())) {
              mediumMatches = true;
            }
            if (size.toLowerCase().includes(quotedKeyword.toLowerCase())) {
              sizeMatches = true;
            }
          }
          if (quotedKeywords.length > 0 && !titleMatches && !mediumMatches && !sizeMatches) {
            thisParentMatches = false;
          }
          
        }

        if (quotedKeywords.length == 0 && contentKeywords.length == 0) {
          thisParentMatches = true;
        }

        // check if the year matches
        // the is last to allow a user to filter the above matches by year
        if (yearKeywords.length > 0) {
          let yearMatches = false;

          for (let k = 0; k < yearKeywords.length; k++) {
            let yearKeyword = yearKeywords[k];
            if (year == yearKeyword) {
              yearMatches = true;
              break;
            } else {
            }
          }

          if (!yearMatches) {
            thisParentMatches = false;
          }
        }

        if (thisParentMatches) {
          matchingParentWorks.push(parentWork);
        }
      }

      if (matchingParentWorks.length > 0) {
        let matchingSeries = { ...series };
        matchingSeries.parentWorks = matchingParentWorks;
        matchesSeries.push(matchingSeries);
      }
    }

    return matchesSeries;
  }

  function searchByColor(colorKeywords) {
    let matchCount = 0;
    let seriesInfo = JSON.parse(localStorage.getItem("seriesInfo"));

    let matchesSeries = []; // list of series objects with matching colors somewhere in the series
    for (let i = 0; i < seriesInfo.length; i++) {
      let series = seriesInfo[i];

      let parentWorks = series.parentWorks;
      let matchingParentWorks = []; // list of parent works with matching colors somewhere in the parent work
      for (let j = 0; j < parentWorks.length; j++) {
        let matchingChildren = []; // list of children with matching colors somewhere in the child title
        for (let k = 0; k < parentWorks[j].children.length; k++) {
          let child = parentWorks[j].children[k];
          let childColor = child.title;
          for (let l = 0; l < colorKeywords.length; l++) {
            let colorKeyword = colorKeywords[l];
            if (childColor.toLowerCase().includes(colorKeyword.toLowerCase())) {
              matchCount++;
              matchingChildren.push(child);
              break;
            }
          }
        }
        if (matchingChildren.length > 0) {
          let matchingParentWork = { ...parentWorks[j] };
          matchingParentWork.children = matchingChildren;
          matchingParentWorks.push(matchingParentWork);
        }
      }

      if (matchingParentWorks.length > 0) {
        let matchingSeries = { ...series };
        matchingSeries.parentWorks = matchingParentWorks;
        matchesSeries.push(matchingSeries);
      }
    }
    return matchesSeries;
  }

  function search(
    colorKeywords,
    contentKeywords,
    quotedKeywords,
    yearKeywords
  ) {

    // Call the searchByColor and searchByContent functions
    let colorResults = searchByColor(colorKeywords);
    let contentResults = searchByContent(
      contentKeywords,
      quotedKeywords,
      yearKeywords
    );

    // If only searching by color or content, return the respective results
    if (
      colorKeywords.length > 0 &&
      contentKeywords.length === 0 &&
      quotedKeywords.length === 0 &&
      yearKeywords.length === 0
    ) {
      return colorResults;
    }
    if (
      colorKeywords.length === 0 &&
      (contentKeywords.length > 0 ||
        quotedKeywords.length > 0 ||
        yearKeywords.length > 0)
    ) {
      return contentResults;
    }

    // If searching by both, loop through the color results and find the matching series in the content results
    let combinedResults = [];
    for (let i = 0; i < colorResults.length; i++) {
      let colorResultSeries = colorResults[i];
      let colorResultParentWorks = colorResultSeries.parentWorks;
      let matchingParentWorks = [];
      for (let j = 0; j < colorResultParentWorks.length; j++) {
        let colorResultParentWork = colorResultParentWorks[j];
        let colorResultChildren = colorResultParentWork.children;
        let matchingChildren = [];
        for (let k = 0; k < colorResultChildren.length; k++) {
          let colorResultChild = colorResultChildren[k];
          let colorResultChildTitle = colorResultChild.title;
          for (let l = 0; l < contentResults.length; l++) {
            let contentResultSeries = contentResults[l];
            let contentResultParentWorks = contentResultSeries.parentWorks;
            for (let m = 0; m < contentResultParentWorks.length; m++) {
              let contentResultParentWork = contentResultParentWorks[m];
              let contentResultChildren = contentResultParentWork.children;
              for (let n = 0; n < contentResultChildren.length; n++) {
                let contentResultChild = contentResultChildren[n];
                let contentResultChildID = contentResultChild.childID;
                if (colorResultChild.childID == contentResultChildID) {
                  matchingChildren.push(contentResultChild);
                  break;
                }
              }
            }
          }
        }
        if (matchingChildren.length > 0) {
          let matchingParentWork = { ...colorResultParentWork };
          matchingParentWork.children = matchingChildren;
          matchingParentWorks.push(matchingParentWork);
        }
      }
      if (matchingParentWorks.length > 0) {
        let matchingSeries = { ...colorResultSeries };
        matchingSeries.parentWorks = matchingParentWorks;
        combinedResults.push(matchingSeries);
      }
    }

    return combinedResults;
  }
  function handleSearch() {
    resetSeriesList();

  
    const contentSearchInput = document.getElementById("content-search");

    const colorSearchInput = document.getElementById("color-search");

    let contentQuery = contentSearchInput.value;
    let colorQuery = colorSearchInput.value;

    if (contentQuery === "" && colorQuery === "") {
      return;
    }

    let contentKeywords = getKeywordsFromQuery(contentQuery);
    let years = getYearsFromQuery(contentQuery);
    let quotedKeywords = getQuotedSegments(contentQuery);
    let colorKeywords = getKeywordsFromQuery(colorQuery);

    let results = search(colorKeywords, contentKeywords, quotedKeywords, years);
    setSeriesInfo(results);

    // get a list of series in results
    let seriesList = [];
    for (let i = 0; i < results.length; i++) {
      let series = results[i];
      seriesList.push(series.series);
    }
    setSeriesOptions(seriesList);

    // trigger a re-render of lazyload components
    // scroll up and down to trigger lazyload
    window.scrollTo(0, 1);
    window.scrollTo(0, 0);
  }

  return (
    <div className={styles.search}>
      {/* <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => props.setSearchQuery(e.target.value)} /> */}
      <TextField
  sx={{
    width: "100%",
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  }}
  id="content-search"
  placeholder="Content"
  type="search"
  variant="outlined"
  className={styles["content-search"]}
  onChange={(e) => {
    handleSearch();
  }}
  size="small"
  InputLabelProps={{
    shrink: false,
  }}
/>
<TextField
  sx={{
    width: "100%",
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  }}
  id="color-search"
  type="search"
  variant="outlined"
  className={styles["color-search"]}
  placeholder="Color"
  onChange={(e) => {
    handleSearch();
  }}
  onKeyPress={(e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }}
  size="small"
  InputLabelProps={{
    shrink: false,
  }}
/>
    </div>
  );
}

export default Search;
