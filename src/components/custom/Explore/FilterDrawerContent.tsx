const data = [
  {
    icon: <MdInsights color="#12B886" size={22} />,
    label: "Sight seeing",
    tagline: "Up to 4-hour drive",
    value: "sight seeing",
  },

  {
    icon: <TbBus color="#12B886" size={22} />,
    label: "Domestic",
    tagline: "Up to 12-hour travel time",
    value: "domestic",
  },
  {
    icon: <BiTrip color="#12B886" size={22} />,
    label: "International",
    tagline: "Outside the country",
    value: "international",
  },
];

const interestData = [
  {
    icon: <MdOutlineLabel color="#12B886" size={22} />,
    label: "Cheapest",
    value: "cheapest",
  },

  {
    icon: <BiLineChart color="#12B886" size={22} />,
    label: "Highest",
    value: "highest",
  },
  {
    icon: <TbDiamond color="#12B886" size={22} />,
    label: "Luxury",
    value: "luxury",
  },
];

import {
  Badge,
  Box,
  Button,
  Menu,
  Popover,
  Slider,
  Space,
  Text,
} from "@mantine/core";
import { BiLineChart, BiTrip } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { MdInsights, MdOutlineLabel } from "react-icons/md";
import { RxReset } from "react-icons/rx";
import { TbBus, TbDiamond } from "react-icons/tb";

interface IFilterProps {
  onChangeInterest: (state: string) => void;
  onChangeMaxBudget: (state: number) => void;
  onChangeTravelIn: (state: string) => void;
  interest: string;
  maxBudget: number;
  travelIn: string;
}
const FilterDrawerContent: React.FC<IFilterProps> = ({
  onChangeInterest,
  onChangeMaxBudget,
  onChangeTravelIn,
  interest,
  maxBudget,
  travelIn,
}) => {
  return (
    <div>
      {(interest || travelIn || maxBudget) && (
        <Box className="grid grid-cols-2 gap-3 drop-shadow-xl px-2 py-5 rounded-md border-[1px] border-solid border-slate-200">
          {maxBudget && (
            <Badge
              radius={100}
              color="yellow"
              fw={500}
              ff={"Nunito sans, sans-serif"}
              size="lg"
            >
              Max budget: {maxBudget}
            </Badge>
          )}
          {interest && (
            <Badge
              radius={100}
              color="violet"
              fw={500}
              ff={"Nunito sans, sans-serif"}
              size="lg"
            >
              Interest: {interest}
            </Badge>
          )}
          {travelIn && (
            <Badge
              radius={100}
              color="teal"
              fw={500}
              ff={"Nunito sans, sans-serif"}
              size="lg"
            >
              Travel: {travelIn}
            </Badge>
          )}
          <Button
            onClick={() => {
              onChangeInterest("");
              onChangeMaxBudget(1200);
              onChangeTravelIn("");
            }}
            radius={100}
            color="red"
            compact
            size="sm"
            fw={500}
            leftIcon={<RxReset />}
            ff={"Nunito sans, sans-serif"}
          >
            Clear filter
          </Button>
        </Box>
      )}

      <Space h={"xl"} />

      <div className="grid grid-cols-2 gap-5 drop-shadow-xl px-2 py-5 rounded-md border-[1px] border-solid border-slate-200">
        <Menu shadow="md" width={250} withArrow>
          <Menu.Target>
            <Button
              size="sm"
              variant="outline"
              color="teal"
              radius={100}
              fw={300}
              rightIcon={<FiChevronDown />}
            >
              Budget
            </Button>
          </Menu.Target>

          <Menu.Dropdown className="mx-auto text-center !p-5" ml={20}>
            <Text size={"sm"}>Max. budget: {maxBudget}</Text>
            <Slider
              size={"lg"}
              color="teal"
              thumbSize={14}
              mt="sm"
              max={12000}
              defaultValue={maxBudget}
              onChange={onChangeMaxBudget}
            />
          </Menu.Dropdown>
        </Menu>

        <Popover width={275} withArrow shadow="md">
          <Popover.Target>
            <Button
              variant="outline"
              color="teal"
              radius={100}
              fw={400}
              rightIcon={<FiChevronDown />}
            >
              Interest
            </Button>
          </Popover.Target>
          <Popover.Dropdown ml={-20} p={10}>
            <Text
              size={"sm"}
              fw={500}
              ff={"Nunito sans, sans-serif"}
              className="text-center !text-gray-700 mt-2"
            >
              What places are you interested in ?
            </Text>

            <Space h={"sm"} />

            {interestData?.map((d, idx) => (
              <Box
                key={idx}
                className={`rounded-[20px] flex items-center gap-5 !my-2  px-3 py-4 cursor-pointer justify-between ${
                  interest === d?.value
                    ? "hover:duration-300 bg-[#E6F9F5] !hover:bg-[#E6F9F5]"
                    : "hover:bg-slate-100"
                }`}
                onClick={() => onChangeInterest(d?.value!)}
              >
                <div className="flex items-center gap-3">
                  {d?.icon}

                  <div>
                    <Text size="sm">{d?.label}</Text>
                  </div>
                </div>
                {interest === d?.value && (
                  <div className="text-right">
                    <FaCheckCircle size={18} color="#12B886" />
                  </div>
                )}
              </Box>
            ))}
          </Popover.Dropdown>
        </Popover>
        <Popover width={275} withArrow shadow="md">
          <Popover.Target>
            <Button
              variant="outline"
              color="teal"
              radius={100}
              fw={400}
              rightIcon={<FiChevronDown />}
            >
              Travel in
            </Button>
          </Popover.Target>
          <Popover.Dropdown ml={20} p={10}>
            <Text
              size={"sm"}
              fw={500}
              ff={"Nunito sans, sans-serif"}
              className="text-center !text-gray-700 mt-2"
            >
              How far do you want to travel ?
            </Text>

            <Space h={"sm"} />

            {data?.map((d, idx) => (
              <Box
                key={idx}
                className={`rounded-[20px] flex items-center gap-5 !my-2  px-3 py-4 cursor-pointer justify-between ${
                  travelIn === d?.value
                    ? "hover:duration-300 bg-[#E6F9F5] !hover:bg-[#E6F9F5]"
                    : "hover:bg-slate-100"
                }`}
                onClick={() => onChangeTravelIn(d?.value!)}
              >
                <div className="flex items-center gap-3">
                  {d?.icon}

                  <div>
                    <Text size="sm">{d?.label}</Text>
                    <Text size="xs" opacity={0.65}>
                      {d?.tagline}
                    </Text>
                  </div>
                </div>
                {travelIn === d?.value && (
                  <div className="text-right">
                    <FaCheckCircle size={18} color="#12B886" />
                  </div>
                )}
              </Box>
            ))}
          </Popover.Dropdown>
        </Popover>

        <Button
          leftIcon={<BsFilter size={20} />}
          fw={400}
          radius={100}
          color="teal"
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterDrawerContent;
