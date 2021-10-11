// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
type KilometersPerHour = {
	kilometers_per_hour: string
}

type CloseApproachData = {
	relative_velocity: KilometersPerHour
}

type FeedNea = {
	neo_reference_id: string
	name: string
	close_approach_data: CloseApproachData[]
}

const dateNow = () => '2020-12-12' //new Date().toISOString().split('T')[0]

const getFeeds = async (): Promise<FeedNea[]> => {
	const response = await fetch(`http://localhost:8080/nea/feed/${dateNow()}`)
	return await response.json()
}

export default async function handler(req, res) {
	const result = await getFeeds()
	res.status(200).json(result)
}
