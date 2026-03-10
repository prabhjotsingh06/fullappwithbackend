import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
const link = new HttpLink({
  uri: "http://localhost:4000/graphql",
});
const authLink = new SetContextLink((prevContext) => {
  const token = localStorage.getItem("accessToken");

  return {
    headers: {
      ...prevContext.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});
