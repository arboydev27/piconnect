import React from "react";
import Sidebar from "@/components/ui/sidebar";
import Home from "@/components/ui/home-page";

const page = () => {
  return (
    <div>
      <Sidebar>
        <Home />
      </Sidebar>
    </div>
  );
};

export default page;
