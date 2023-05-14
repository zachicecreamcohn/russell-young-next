import React from "react";
import Body from "@/components/Body/Body";
import SeriesPrioritySelector from "@/components/Settings/preferences/SeriesPrioritySelector/SeriesPrioritySelector";

function Sandbox() {
  return (
    <Body center h-80>
        <p>Sandbox</p>
        <SeriesPrioritySelector />
    </Body>
  );
}

export default Sandbox;