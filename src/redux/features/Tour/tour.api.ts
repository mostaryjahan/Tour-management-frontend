import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOUR"],
    }),
    removeTourType: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-types/${tourTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),
    getTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => response.data,
    }),
    // add tour
    addTour: builder.mutation({
      query: (tour) => ({
        url: "/tour/create",
        method: "POST",
        data: tour,
      }),
      invalidatesTags: ["TOUR"],
    }),
    getAllTour:builder.query({
      query: () => ({
        url: "/tour",
        method: "GET",
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => response.data,
    }),
    removeTour: builder.mutation({
      query: (tourId) => ({
        url: `/tour/${tourId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),
  }),
});

export const { useAddTourTypeMutation,useRemoveTourTypeMutation, useGetTourTypesQuery, useAddTourMutation, useGetAllTourQuery, useRemoveTourMutation } = tourApi;
