import { Flex, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";

const PaymentAccountsArea: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 mt-3">
      <Flex gap={10} align={"center"} justify={"center"}>
        <Image
          src={"https://i.ibb.co/MV4xMkt/download.jpg"}
          alt="logo"
          width={30}
          height={30}
          className="rounded-full"
        />

        <Text>01611859722</Text>
      </Flex>
      <Flex gap={10} align={"center"} justify={"center"}>
        <Image
          src={"https://i.ibb.co/yVFVZqD/download-1.jpg"}
          alt="logo"
          width={30}
          height={30}
          className="rounded-full"
        />

        <Text>01611859722</Text>
      </Flex>
      <Flex gap={10} align={"center"} justify={"center"}>
        <Image
          src={"https://i.ibb.co/M9WrrqV/download-2.jpg"}
          alt="logo"
          width={30}
          height={30}
          className="rounded-full"
        />

        <Text>01611859722</Text>
      </Flex>
    </div>
  );
};

export default PaymentAccountsArea;
