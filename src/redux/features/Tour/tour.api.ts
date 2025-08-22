import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage } from "@/types";

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
      query: (params) => ({
        url: "/tour/tour-types",
        method: "GET",
        params
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
    getAllTour:builder.query<ITourPackage[],unknown> ({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params
        
      }),
      providesTags: ["TOUR"],
      transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
    }),
      getSingleTour:builder.query<ITourPackage[],unknown> ({
      query: (id) => ({
        url: `/tour/${id}`,
        method: "GET",
        
      }),
      providesTags: ["TOUR"],
      transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
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

export const { useAddTourTypeMutation,useRemoveTourTypeMutation, useGetTourTypesQuery, useAddTourMutation, useGetAllTourQuery, useRemoveTourMutation, useGetSingleTourQuery } = tourApi;
