export interface AdviceProps {
    id?: string,
    laboratory_id: string,
    sub_event_id: string,
    created_by: string,
    description: string,
    seats_affected: number,
    tier?: "LOW" | "MEDIUM" | "HIGH"
    date_created?: Date,
    resolved?: boolean,
}

export class Advice {
    private props: AdviceProps

    constructor(props: AdviceProps, id?: string) {
        this.props = {
            ...props,
            id: id ?? props.id,
            tier: props.tier ?? "LOW",
            date_created: props.date_created ?? new Date(),
            resolved: props.resolved ?? false,
        }
    }

    get id(): string | undefined {
        return this.props.id
    }

    get laboratoryId(): string{
        return this.props.laboratory_id
    }

    get subEventId(): string{
        return this.props.sub_event_id
    }

    get createdBy(): string{
        return this.props.created_by
    }

    get description(): string {
        return this.props.description
    }

    public updateDescription(newDescription: string){
        this.props.description = newDescription
    }

    get seatsAffected(): number{
        return this.props.seats_affected
    }

    public updateSeatsAffected(newSeats: number){
        this.props.seats_affected = newSeats
    }

    get tier(): "LOW" | "MEDIUM" | "HIGH" | undefined{
        return this.props.tier
    }

    public updateTier(newTier: "LOW" | "MEDIUM" | "HIGH"){
        this.props.tier = newTier
    }

    get dateCreated(): Date | undefined{
        return this.props.date_created
    }

    public resolved(){
        this.props.resolved = true
    }

    public unresolved(){
        this.props.resolved = false
    }

    toJSON(): AdviceProps {
        return { ...this.props }
    }   
}