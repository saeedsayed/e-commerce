// get api token from environment variable
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getData = async (
    endPoint: string,
    populate?: string[],
    filters?: {
        field: string;
        operator: string;
        value: any;
    }[],
    pageSize?: number
): Promise<[string | null, any]> => {
    let error: string | null = null;
    let response: any[] = [];
    // construct query params
    // const populates = !!populate ? populate.map((p, i) => `populate=${p}&`) : "";
    const filter = !!filters
        ? filters.map(
            ({ field, operator, value }) =>
                `filters${field}[$${operator}]=${value}&`
        )
        : "";
    const page_size = !!pageSize ? `pagination[pageSize]=${pageSize}&` : "";
    // construct api url with query params and remove commas
    const apiUrl = `${baseUrl}${endPoint}?${filter}${page_size}`.replaceAll(",", "");
    try {
        // fetch data from api url
        const apiCall = await fetch(apiUrl, {
            headers: {
                Authorization: ("Bearer " +
                    process.env.NEXT_PUBLIC_STRAPI_API_TOKEN) as string,
            },
        });
        // check if api call is successful
        if (!apiCall.ok) throw new Error(`HTTP error! status: ${apiCall.status}`);
        // parse response data
        const json = await apiCall.json();
        response = json.data;
    } catch (err: any) {
        // set error message
        error = err.message;
    }
    // return error and response
    return [error, response];
};
