import { describe, expect, it } from "vitest";
import { Appointment } from "../../entities/appointment";
import { CreateAppointment } from "../create-appointment";
import { getFutureDate } from "../../utils/get-future-date";

describe("create appointment", () => {
  it("should be able to create an appointment", () => {
    const createAppointment = new CreateAppointment();

    const startsAt = getFutureDate('2023-03-15');
    const endsAt = getFutureDate('2023-03-16');

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
});
