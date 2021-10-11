// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const getFeeds = async () => {
	const response = await fetch('http://localhost:8080/nea/actuator/')
	return await response.json()
}

export default async function handler(req, res) {
	const result = await getFeeds()
	res.status(200).json(result)
}
