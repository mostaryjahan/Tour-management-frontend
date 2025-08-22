import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation({
      query: (divisionName) => ({
        url: "/division/create",
        method: "POST",
        data: divisionName,
      }),
      invalidatesTags: ["DIVISION"],
    }),
    removeDivision: builder.mutation({
      query: (divisionId) => ({
        url: `/division/${divisionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DIVISION"],
    }),
    getAllDivision: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      providesTags: ["DIVISION"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useAddDivisionMutation,useRemoveDivisionMutation, useGetAllDivisionQuery } = divisionApi;
