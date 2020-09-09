import { Duration } from 'date-fns';

export interface Record {
    start: Date;
    duration: Duration;
    log: string;
}

export interface Schedule {
    id: string;
    title: string;
    description: string;
    start?: Date;
    duration: Duration;
    record?: Record;
}
