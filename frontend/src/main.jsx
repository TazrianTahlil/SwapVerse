import React from "react";
import ReactDom from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);