export interface TimeSpan {
    start: Date;
    end: Date;
}

export interface Records {
    timeSpans: TimeSpan[];
    log: string;
}

export interface Schedule {
    id: string;
    title: string;
    description: string;
    timeSpan: TimeSpan;
    records: Records;
}
