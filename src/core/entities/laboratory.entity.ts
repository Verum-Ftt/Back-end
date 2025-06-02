export interface LaboratoryProps{
    id?: string,
    local?: string,      
    total_capacity: number, 
    available_capacity: number,             
    created_at?: Date,  
    last_updated?: Date
}

export class Laboratory {
    private props: LaboratoryProps

    constructor(props: LaboratoryProps, id?: string){
        this.props = {
            ...props,
            id: id ?? props.id,
            local: props.local,
            created_at: props.created_at ?? new Date(),
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

    set local(local: string) {
        this.props.local = local
    }

    get totalCapacity(): number{
        return this.props.total_capacity
    }

    set totalCapacity(totalCapacity: number){
        this.props.total_capacity = totalCapacity
    }

    get availableCapacity(): number{
        return this.props.available_capacity
    }

    set availableCapacity(availableCapacity: number){
        this.props.available_capacity = availableCapacity
    }

    toJSON(): LaboratoryProps{
        return { ...this.props }
    }
}