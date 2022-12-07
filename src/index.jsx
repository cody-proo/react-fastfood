import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Root from "./root";
import "react-toastify/dist/ReactToastify.css";
import 'react-loading-skeleton/dist/skeleton.css'


const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <ToastContainer
      rtl={true}
      theme="colored"
      style={{ zIndex: 9999999, fontFamily: "iransans" }}
    />
    <Root />
  </QueryClientProvider>
);
