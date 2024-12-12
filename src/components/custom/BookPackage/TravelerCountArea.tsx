import { travelerInfoAtom } from "@/store/bookingForm.store";
import { ActionIcon, Divider, Space, Text, Title } from "@mantine/core";
import { useAtom } from "jotai";
import React from "react";

const TravelerCountArea: React.FC = () => {
  const [travelerDetails, setTravelerDetails] = useAtom(travelerInfoAtom);

  return (
    <div>
      <div className="flex justify-between items-center ">
        <Text mb={3} fz={16}>
          Traveler count
        </Text>
      </div>
      <Divider h="sm" />
      <Space h="xs" />
      <div className="flex items-center justify-between">
        <div>
          <Title
            color="#a3abbb"
            order={4}
            fw={500}
            fz={16}
            ff={"Nunito Sans,sans-serif"}
          >
            Adults
          </Title>{" "}
          <span className="text-[12px] text-[#252626]">5 years+</span>
        </div>
        <div className="flex items-center gap-3">
          <ActionIcon
            disabled={travelerDetails?.adult === 1}
            color="teal"
            variant="light"
            size={"lg"}
            onClick={() =>
              setTravelerDetails({
                ...travelerDetails,
                adult: travelerDetails?.adult! - 1,
              })
            }
          >
            -
          </ActionIcon>
          <span>{travelerDetails?.adult}</span>
          <ActionIcon
            disabled={travelerDetails?.adult === 9}
            color="teal"
            variant="light"
            size={"lg"}
            onClick={() =>
              setTravelerDetails({
                ...travelerDetails,
                adult: travelerDetails?.adult! + 1,
              })
            }
          >
            +
          </ActionIcon>
        </div>
      </div>
      <Space h="md" />
      <div className="flex items-center justify-between">
        <div>
          <Title
            color="#a3abbb"
            order={4}
            fw={500}
            fz={16}
            ff={"Nunito Sans,sans-serif"}
          >
            Children
          </Title>{" "}
          <span className="text-[12px] text-[#252626]">
            1 - 5 years (30% discount)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ActionIcon
            disabled={travelerDetails?.child === 0}
            color="teal"
            variant="light"
            size={"lg"}
            onClick={() =>
              setTravelerDetails({
                ...travelerDetails,
                child: travelerDetails?.child! - 1,
              })
            }
          >
            -
          </ActionIcon>
          <span>{travelerDetails?.child}</span>
          <ActionIcon
            disabled={travelerDetails?.child === 9}
            color="teal"
            variant="light"
            size={"lg"}
            onClick={() =>
              setTravelerDetails({
                ...travelerDetails,
                child: travelerDetails?.child! + 1,
              })
            }
          >
            +
          </ActionIcon>
        </div>
      </div>
    </div>
  );
};

export default TravelerCountArea;
