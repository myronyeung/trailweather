import React from "react";

import { AppBar } from "@mui/material";

const TopNav: React.FunctionComponent<{}> = () => {
  return (
    <AppBar>
      <h1>TrailWeather</h1>
    </AppBar>
  );
};

TopNav.displayName = "TopNav";

export default TopNav;
