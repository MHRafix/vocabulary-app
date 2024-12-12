import { AppShell } from "@mantine/core";
import React from "react";
import ClientFooter from "./ClientFooter";
import { ClientHeader } from "./ClientHeader";

const ClientAppLayout: React.FC<{
  backIcon?: boolean;
  children: JSX.Element;
}> = ({ backIcon, children }) => {
  return (
    <AppShell
      header={<ClientHeader backIcon={backIcon} />}
      styles={(theme) => ({
        main: {
          width: "100%",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          padding: "0px",
        },
      })}
    >
      <main>{children}</main>
      <ClientFooter />
    </AppShell>
  );
};

export default ClientAppLayout;
