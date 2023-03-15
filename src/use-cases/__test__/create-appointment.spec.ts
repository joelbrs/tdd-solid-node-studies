import { describe, expect, it } from "vitest";
import { Appointment } from "../../entities/appointment";
import { CreateAppointment } from "../create-appointment";
import { getFutureDate } from "../../utils/get-future-date";
import { InMemoryAppointmentsRepository } from "../../entities/in-memory/in-memory-appointments-repository";

describe("create appointment", () => {
  it("should be able to create an appointment", () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

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

  it("should not to be able to create an appointment with overlapping dates", async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate('2023-03-15');
    const endsAt = getFutureDate('2023-03-16');
  
    await createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt,
    })

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-03-14'),
      endsAt: getFutureDate('2023-03-18')
    })).rejects.toBeInstanceOf(Error);
  });
});
