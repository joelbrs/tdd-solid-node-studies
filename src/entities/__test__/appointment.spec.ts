import { expect, it } from "vitest";
import { CreateAppointment } from "../../use-cases/create-appointment";
import { Appointment } from "../appointment";

it("create an appointment", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() + 1);
  endsAt.setDate(startsAt.getDate() + 3);

  const appointment = new Appointment({
    customer: "John Doe",
    startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("John Doe");
});

it("cannot create an appointment with end date before start date", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(endsAt.getDate() + 2);
  endsAt.setDate(endsAt.getDate() + 1);

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    });
  }).toThrow();

  it("cannot be able to create an appointment with date before now", () => {
    const createAppointment = new CreateAppointment();

    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() - 1);
    endsAt.setDate(startsAt.getDate() + 3);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
});
