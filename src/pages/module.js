import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Layout, ModuleDetail, QueryResult } from "../components";

/**
 * This is the Module page which is displays
 */

export const GET_MODULE = gql`
	query getModule($moduleId: ID!, $trackId: ID!) {
		module(id: $moduleId) {
			id
			title
			content
			videoUrl
		}
		track(id: $trackId) {
			title
			id
			modules {
				id
				title
				length
			}
		}
	}
`;
const Module = ({ trackId, moduleId }) => {
	const { loading, error, data } = useQuery(GET_MODULE, {
		variables: { moduleId, trackId },
	});

	return (
		<Layout fullWidth>
			<QueryResult data={data} error={error} loading={loading}>
				<ModuleDetail module={data?.module} track={data?.track} />
			</QueryResult>
		</Layout>
	);
};

export default Module;
