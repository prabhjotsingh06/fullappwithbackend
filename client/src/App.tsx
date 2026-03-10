import { router } from "./router/routes";
import { RouterProvider } from "react-router/dom";
import UserContextProvider from "./contextApi/UserContextProvider";
import { ThemeProvider } from "./contextApi/themeProvider";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./api/ApolloClient";

function App() {
  return (
    <UserContextProvider>
      <ThemeProvider>
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
