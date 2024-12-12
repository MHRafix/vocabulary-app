import { ISelectInputValueType } from "@/app/config/logic/getAvailableDestinations";
import { getStyle } from "@/app/config/logic/getSelectInputStyle";
import {
  ActionIcon,
  Divider,
  Flex,
  Input,
  Paper,
  Popover,
  Select,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import Router from "next/router";
import { BiMap } from "react-icons/bi";
import { FiCalendar } from "react-icons/fi";
import { HiUsers } from "react-icons/hi";
import { TbSearch } from "react-icons/tb";
interface ISearchProps {
  adults: number;
  child: number;
  dates: [Date | null, Date | null];
  destination: string;
  onChangeDestination: (state: string) => void;
  onChangeAdults: (state: number) => void;
  onChangeChild: (state: number) => void;
  onChangeDates: (state: [Date | null, Date | null]) => void;
  availableDestinations: ISelectInputValueType[];
}
const SearchArea: React.FC<ISearchProps> = ({
  adults,
  child,
  dates,
  destination,
  onChangeDestination,
  onChangeAdults,
  onChangeChild,
  onChangeDates,
  availableDestinations,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const onSearchSubmit = () => {
    Router.push(
      `/explore/search?from=Dhaka, Bangladesh&&destination=${destination}&&fromDate=${dates[0]}&&toDate=${dates[1]}&&adults=${adults}&&child=${child}`
    );
  };

  return (
    <div className="mx-auto ">
      <Paper
        withBorder
        shadow="xl"
        // radius={100}
        className="md:!rounded-full rounded-lg px-5 md:py-3 py-5 lg:w-10/12 mx-auto"
      >
        <div className="md:flex items-center md:gap-4 gap-8 grid">
          <Input.Wrapper
            className="md:w-2.5/12 w-12/12"
            label={
              <Flex align={"center"} mb={0}>
                <BiMap color="#12B886" size={18} />{" "}
                <span className="text-lg font-medium ml-1 mt-[3px]">From</span>
              </Flex>
            }
          >
            <Input
              size="md"
              placeholder="Current location"
              variant="unstyled"
              defaultValue={"Dhaka, Bangladesh"}
              disabled
              className="ml-2"
            />
          </Input.Wrapper>
          <Input.Wrapper
            className="md:w-2.5/12 w-12/12"
            label={
              <Flex align={"center"} mb={0}>
                <BiMap color="#12B886" size={18} />{" "}
                <span className="text-lg font-medium ml-1 mt-[3px]">To</span>
              </Flex>
            }
          >
            <Select
              data={availableDestinations!}
              disabled={!availableDestinations?.length!}
              size="md"
              onChange={onChangeDestination}
              placeholder="Select destination"
              searchable
              nothingFound="Sorry, No destination found."
              variant="unstyled"
              styles={() => getStyle("#0CA678")}
              className="ml-2"
              required
            />
          </Input.Wrapper>
          <Input.Wrapper
            className="md:w-4/12 w-12/12"
            label={
              <Flex align={"center"}>
                <FiCalendar color="#12B886" size={18} />
                <span className="text-lg font-medium ml-1 mt-[3px]">Dates</span>
              </Flex>
            }
          >
            <DateRangePicker
              placeholder="When you go ?"
              variant={dates?.length ? "filled" : "filled"}
              radius={dates?.length ? 100 : 100}
              value={dates}
              size="md"
              onChange={(d) => onChangeDates(d)}
              clearable={false}
              color="teal"
            />
          </Input.Wrapper>
          <Input.Wrapper
            label={
              <Flex align={"center"} mb={0}>
                <HiUsers color="#12B886" size={18} />{" "}
                <span className="text-lg font-medium ml-1 mt-[3px]">
                  Travelers
                </span>
              </Flex>
            }
          >
            <Popover
              width={261}
              position="bottom-start"
              shadow="md"
              opened={opened}
              onClose={close}
              withArrow
            >
              <Popover.Target>
                <div
                  onClick={() => open()}
                  className={`py-1 px-4 rounded-lg cursor-pointer ${"hover:bg-[#E6F9F5]"}`}
                >
                  <span className="text-md text-[#6C757D]">Travelers</span>
                  <Title
                    ff={"Nunito Sans,sans-serif"}
                    fw={500}
                    fz={20}
                    color="#545454"
                  >
                    {adults + child}
                  </Title>
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <div>
                  <Text color="teal" mb={3} fz={16}>
                    Travelers
                  </Text>
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
                      <span className="text-[12px] text-[#252626]">
                        12 years+
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ActionIcon
                        disabled={adults === 1}
                        color="teal"
                        variant="light"
                        size={"lg"}
                        onClick={() => onChangeAdults(adults - 1)}
                      >
                        -
                      </ActionIcon>
                      <span>{adults}</span>
                      <ActionIcon
                        disabled={adults === 9}
                        color="teal"
                        variant="light"
                        size={"lg"}
                        onClick={() => onChangeAdults(adults + 1)}
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
                        1 - 12 years
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ActionIcon
                        disabled={child === 0}
                        color="teal"
                        variant="light"
                        size={"lg"}
                        onClick={() => onChangeChild(child - 1)}
                      >
                        -
                      </ActionIcon>
                      <span>{child}</span>
                      <ActionIcon
                        disabled={child === 9}
                        color="teal"
                        variant="light"
                        size={"lg"}
                        onClick={() => onChangeChild(child + 1)}
                      >
                        +
                      </ActionIcon>
                    </div>
                  </div>
                  <Divider h={1} my={10} />
                </div>
              </Popover.Dropdown>
            </Popover>
          </Input.Wrapper>

          <button
            // type='submit'
            onClick={onSearchSubmit}
            className="!rounded-[100px] bg-[#0CA678] text-white text-center w-[52px] h-[50px] flex items-center justify-center mx-auto hover:bg-[#0e926b]"
          >
            <TbSearch size={20} />
          </button>
        </div>
      </Paper>
    </div>
  );
};

export default SearchArea;
