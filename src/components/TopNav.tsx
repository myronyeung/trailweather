import React from "react";

import AppBar from "@mui/material/AppBar";

const TopNav: React.FunctionComponent<{}> = () => {
  return (
    <AppBar position="fixed">
      <h1>TrailWeather</h1>
    </AppBar>
  );
};

TopNav.displayName = "TopNav";

export default TopNav;
