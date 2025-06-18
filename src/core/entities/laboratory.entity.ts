export interface LaboratoryProps{
    id?: string,
    local?: string,      
    total_capacity: number, 
    available_capacity: number,             
    date_created?: Date,  
    last_updated?: Date
}

export class Laboratory {
    private props: LaboratoryProps

    constructor(props: LaboratoryProps, id?: string){
        this.props = {
            ...props,
            id: id ?? props.id,
            local: props.local,
            date_created: props.date_created ?? new Date(),
            last_updated: props.last_updated ?? new Date()
        }

        if (this.props.available_capacity > this.props.total_capacity) {
            throw new Error('A capacidade disponível não pode ser maior que a capacidade total.');
        }
        if (this.props.total_capacity < 0) {
            throw new Error('A capacidade total não pode ser negativa.');
        }
    }

    get id(): string | undefined{
        return this.props.id
    }

    get local(): string | undefined{
        return this.props.local
    }

    public publicLocal(local: string) {
        this.props.local = local
    }

    get totalCapacity(): number{
        return this.props.total_capacity
    }

    public publicaTotalCapacity(totalCapacity: number){
        this.props.total_capacity = totalCapacity
    }

    get availableCapacity(): number{
        return this.props.available_capacity
    }

    public publicAvailableCapacity(availableCapacity: number){
        this.props.available_capacity = availableCapacity
    }

    toJSON(): LaboratoryProps{
        return { ...this.props }
    }
}