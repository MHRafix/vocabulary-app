import { bookingId, stepController } from "@/store/bookingForm.store";
import {
  ActionIcon,
  Button,
  CopyButton,
  Flex,
  Text,
  Tooltip,
} from "@mantine/core";
import { useAtom } from "jotai";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { HiOutlineArrowLeft } from "react-icons/hi";
import DoneAnimation from "./doneLottie.gif";

const BookingCompleted = () => {
  const [bookingUId, onChangeBookingId] = useAtom(bookingId);
  const [, onChangeActiveStep] = useAtom(stepController);
  const goHomeStep = () => {
    onChangeBookingId("");
    onChangeActiveStep({
      activeStep: 0,
    });
  };

  return (
    <div className="text-center ">
      <Image
        src={DoneAnimation}
        alt="gif"
        width={150}
        height={150}
        className="mx-auto"
      />

      <Flex
        gap={8}
        align="center"
        justify={"center"}
        mb={10}
        className="!text-[13px] sm:!text-[15px]"
      >
        Copy BookingId:{" "}
        <span className="bg-[red] px-2 py-[2px] text-white rounded-md">
          {bookingUId!}
        </span>
        <CopyButton value={bookingUId!} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? "Copied" : "Copy"}
              withArrow
              position="right"
            >
              <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                {copied ? <FaCheck size="1rem" /> : <FiCopy size="1rem" />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Flex>

      <Text
        ff={"Nunito sans, sans-serif"}
        className="!text-[20px] sm:!text-[25px]"
        fw={700}
      >
        Thanks for your booking
      </Text>
      <Text
        ff={"Nunito sans, sans-serif"}
        className="!text-[13px] sm:!text-[15px]"
        fw={500}
      >
        Have a nice travel, Fiamanillah
      </Text>

      <Button
        color="red"
        my={10}
        leftIcon={<HiOutlineArrowLeft size={16} />}
        onClick={goHomeStep}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default BookingCompleted;
