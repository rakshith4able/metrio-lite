import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Layout from "components/Layout/Layout";
import Forms from "components/Forms/FormsList/Forms";
import FormDetails from "components/Forms/FormDetails";
import FormDataList from "components/FormData/FormDataList";
import CreateForm from "components/Forms/CreateForm";
import EditFormSelector from "components/Forms/EditFormSelector";
import NotFoundPage from "components/Common/NotFoundPage/NotFoundPage";
import ViewFormDataSelector from "components/FormData/ViewFormDataSelector";

export default function Router() {
  const routerConfig = [
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Forms /> },
        { path: "/forms", element: <Forms /> },
        { path: "/forms/create", element: <CreateForm /> },
        { path: "/forms/:formId", element: <FormDetails /> },
        { path: "/forms/:formId/data", element: <FormDataList /> },
        { path: "/forms/:formId/edit", element: <FormDetails /> },
        { path: "/forms/modify", element: <EditFormSelector /> },
        { path: "/forms/data", element: <ViewFormDataSelector /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ];

  const router = createBrowserRouter(routerConfig);

  return (
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}
