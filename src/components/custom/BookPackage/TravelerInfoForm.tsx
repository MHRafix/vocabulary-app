import {
  IPackageBookingFormStates,
  PACKAGE_BOOKING_FORM_DEFAULT_VALUES,
  PACKAGE_BOOKING_VALIDATION_SCHEMA,
} from "@/app/config/forms/packageBooking/packageBooking.validation";
import { customerInfoAtom, stepController } from "@/store/bookingForm.store";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Group, Input, Text } from "@mantine/core";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const TravelerInfoForm: React.FC = () => {
  const [customerInfo, setCustomerAtom] = useAtom(customerInfoAtom);
  const [step, onChangeActiveStep] = useAtom(stepController);
  const nextStep = () =>
    onChangeActiveStep({
      activeStep:
        step.activeStep! < 3 ? step.activeStep! + 1 : step.activeStep!,
    });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: PACKAGE_BOOKING_FORM_DEFAULT_VALUES,
    resolver: yupResolver(PACKAGE_BOOKING_VALIDATION_SCHEMA),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("name", customerInfo?.name);
    setValue("email", customerInfo?.email);
    setValue("phone", customerInfo?.phone);
    setValue("address", customerInfo?.address);
  }, [customerInfo]);

  const onSubmit = (value: IPackageBookingFormStates) => {
    setCustomerAtom({
      ...value,
    });
    nextStep();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit!)}>
        <div className="grid lg:grid-cols-2 gap-4">
          <Input.Wrapper
            size="sm"
            label={
              <Text ff="Nunito Sans, sans-serif" fw={700}>
                Name
              </Text>
            }
            error={<ErrorMessage errors={errors} name="name" />}
          >
            <Input
              //   disabled={creatingAppointment}
              {...register("name")}
              defaultValue={customerInfo?.name!}
              variant="filled"
              id="removeDefaultBorder"
              placeholder="Mehedi H. Rafiz"
              size="md"
            />
          </Input.Wrapper>
          <Input.Wrapper
            label={
              <Text ff="Nunito Sans, sans-serif" fw={700}>
                Email
              </Text>
            }
            size="sm"
            error={<ErrorMessage errors={errors} name="email" />}
          >
            <Input
              defaultValue={customerInfo?.email}
              variant="filled"
              id="removeDefaultBorder"
              placeholder="example@gmail.com"
              size="md"
              {...register("email")}
            />
          </Input.Wrapper>
          <Input.Wrapper
            size="sm"
            label={
              <Text ff="Nunito Sans, sans-serif" fw={700}>
                Phone
              </Text>
            }
            error={<ErrorMessage errors={errors} name="phone" />}
          >
            <PhoneInput
              // {...register('phone')}
              value={customerInfo?.phone}
              id="book_pacakge_phone_input"
              international
              defaultCountry="BD"
              onChange={(value) => setValue("phone", value)}
              // {...updateProfileForm.getInputProps('phone')}
            />
          </Input.Wrapper>
          <Input.Wrapper
            label={
              <Text ff="Nunito Sans, sans-serif" fw={700}>
                Address
              </Text>
            }
            size="sm"
            error={<ErrorMessage errors={errors} name="address" />}
          >
            <Input
              //   disabled={creatingAppointment}
              {...register("address")}
              defaultValue={customerInfo?.address}
              variant="filled"
              id="removeDefaultBorder"
              placeholder="Mirpur, Dhaka"
              size="md"
            />
          </Input.Wrapper>
        </div>
        {step.activeStep !== 1 && (
          <Group position="right" mt="md">
            <Button color="teal" type="submit">
              Next step
            </Button>
          </Group>
        )}
      </form>
    </div>
  );
};

export default TravelerInfoForm;
