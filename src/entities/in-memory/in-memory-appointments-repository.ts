import { AppointmentsRepository } from "../../repositories/appointment-repository";
import { Appointment } from "../appointment";
import { areIntervalsOverlapping } from "date-fns";

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
    public items: Array<Appointment> = []

    async create(appointment: Appointment): Promise<void> {
        this.items.push(appointment);
    }

    async findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
        const overlappingAppointment = this.items.find(appointment => {
            return areIntervalsOverlapping(
                { start: startsAt, end: endsAt },
                { start: appointment.startsAt, end: appointment.endsAt },
                { inclusive: true }
            );
        });

        if (!overlappingAppointment) return null;

        return overlappingAppointment;
    }
}