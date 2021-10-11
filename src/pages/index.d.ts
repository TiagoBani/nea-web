export type KilometersPerHour = {
	kilometers_per_hour: string
}

export type CloseApproachData = {
	relative_velocity: KilometersPerHour
}

export type FeedNea = {
	neo_reference_id: string
	name: string
	close_approach_data: CloseApproachData[]
}
