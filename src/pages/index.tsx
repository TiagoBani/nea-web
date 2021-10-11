import { GetStaticProps } from 'next'
import { Provider } from 'next-auth/client'
import { useSession, signIn, signOut } from 'next-auth/react'
import React from 'react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { api } from '../services/api'

import { FeedNea } from './index.d'

type HomeProps = {
	feedList: FeedNea[]
}

export default function Home({ feedList }: HomeProps) {
	const { data: session } = useSession()
	if (session) {
		return (
			<>
				Signed in as {session.user.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		)
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	)

	// // if (feedList?.length <= 0)
	// // 	return (
	// // 		<>
	// // 			<Head>
	// // 				<meta name='robots' content='noindex' />
	// // 			</Head>
	// // 			<DefaultErrorPage statusCode={404} />
	// // 		</>
	// // 	)
	// // feedList.push(feedList[0])

	// // return (
	// // 	<table>
	// // 		<tr>
	// // 			<th>name</th>
	// // 			<th>neo_reference_id</th>
	// // 			<th>close_approach_data</th>
	// // 		</tr>
	// // 		{feedList &&
	// // 			feedList.map(({ neo_reference_id, name, close_approach_data }, i) => {
	// // 				const [
	// // 					{
	// // 						relative_velocity: { kilometers_per_hour },
	// // 					},
	// // 				] = close_approach_data
	// // 				return (
	// // 					<tr key={i}>
	// // 						<td>{name}</td>
	// // 						<td>{neo_reference_id}</td>
	// // 						<td>relative_velocity {kilometers_per_hour} km/h</td>
	// // 					</tr>
	// // 				)
	// // 			})}
	// // 	</table>
	// )
}

// Apenas para paginas com parametro
// export const getStaticPaths: GetStaticPaths = async () => {
// 	return {
// 		paths: [],
// 		fallback: 'blocking',
// 	}
// }

export const getStaticProps: GetStaticProps = async (context) => {
	try {
		const dateNow = () => '2020-12-12' //new Date().toISOString().split('T')[0]
		const { data: feedList } = await api.get<FeedNea[]>(
			`/nea/feed/${dateNow()}`
		)
		return {
			props: {
				feedList,
			},
			revalidate: 60 * 60 * 8, // 8 hours
		}
	} catch (e) {
		console.error(e.message)
		return {
			props: {
				feedList: [],
			},
			revalidate: 60 * 60 * 8, // 8 hours
		}
	}
}
